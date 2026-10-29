import { NextResponse } from "next/server";
import {
  categoryLabel,
  normaliseEnquiry,
  validateEnquiry,
  type EnquiryCategory,
  type EnquiryInput,
} from "@/lib/enquiry";

/**
 * Contact form endpoint.
 *
 * Enquiries are delivered by email through Resend (https://resend.com) using
 * server-only environment variables — nothing here reaches the browser:
 *   RESEND_API_KEY      API key for Resend
 *   CONTACT_TO_EMAIL    Inbox that receives enquiries
 *   CONTACT_FROM_EMAIL  Verified sender, e.g. "Anvayam Website <website@your-domain>"
 *
 * If any are missing the endpoint answers 503 so the form shows an honest
 * error instead of a fake success. See README.md → "Contact form delivery".
 */

export const runtime = "nodejs";

const MIN_FILL_MS = 2500;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const MAX_BODY_BYTES = 20_000;

// Best-effort, per-instance rate limiting. For multi-instance deployments use
// a shared store (e.g. Upstash Redis) or the platform's firewall rules.
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(k);
  }
  return recent.length > RATE_LIMIT.max;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function buildEmail(input: EnquiryInput) {
  const subjectLabel = categoryLabel(input.category as EnquiryCategory);
  const rows: Array<[string, string]> = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Organisation / role", input.organisation || "—"],
    ["Subject of enquiry", subjectLabel],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", input.message].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;color:#292D29;line-height:1.5">
<h2 style="font-family:Georgia,serif;color:#244B3A;font-weight:500">New website enquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5a605a;vertical-align:top">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
<p style="color:#5a605a;margin-top:20px">Message</p>
<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
</div>`;
  return { subject: `Website enquiry: ${subjectLabel} — ${input.name}`, text, html };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "Your message is too long to send." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, message: "We couldn’t read your enquiry. Please try again." }, { status: 400 });
  }

  // Spam checks: honeypot filled, or submitted implausibly fast. Respond as if
  // accepted so bots get no signal, but deliver nothing.
  const honeypot = typeof body.website === "string" && body.website.trim() !== "";
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if (honeypot || elapsed < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "You’ve sent several enquiries in a short time. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const input = normaliseEnquiry(body);
  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    console.error("[contact] Delivery is not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL.");
    return NextResponse.json(
      {
        ok: false,
        message: "Our enquiry form is not yet connected to an inbox, so your message could not be sent. Please try again later.",
      },
      { status: 503 },
    );
  }

  const email = buildEmail(input);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: input.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
        tags: [{ name: "source", value: "website-contact" }],
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("[contact] Resend responded with", response.status, await response.text().catch(() => ""));
      throw new Error("Delivery failed");
    }
  } catch (error) {
    console.error("[contact] Failed to deliver enquiry:", error);
    return NextResponse.json(
      { ok: false, message: "We couldn’t deliver your enquiry just now. Please try again in a little while." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
