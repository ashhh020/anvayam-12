"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  enquiryCategories,
  isEnquiryCategory,
  limits,
  normaliseEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/enquiry";
import { buttonClasses } from "@/components/ui/Button";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const fieldOrder: EnquiryField[] = ["name", "email", "phone", "organisation", "category", "message", "consent"];

const inputBase =
  "mt-2 block w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg text-mist placeholder:text-mist/35 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0";

function inputClasses(invalid: boolean) {
  return `${inputBase} ${
    invalid ? "border-alert focus:border-alert" : "border-white/20 focus:border-gold"
  }`;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const initialCategory = isEnquiryCategory(requested) ? requested : "";

  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [messageLength, setMessageLength] = useState(0);
  const uid = useId();

  // Time since the form appeared; very fast submissions are treated as bots.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const ids = (field: string) => ({ input: `${uid}-${field}`, error: `${uid}-${field}-error` });

  const submitting = status.state === "submitting";

  const readForm = () => {
    const data = new FormData(formRef.current!);
    return normaliseEnquiry({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      organisation: data.get("organisation"),
      category: data.get("category"),
      message: data.get("message"),
      consent: data.get("consent"),
    });
  };

  /** Re-validate a single field once it has already shown an error. */
  const revalidate = (field: EnquiryField) => {
    if (!errors[field]) return;
    const next = validateEnquiry(readForm());
    setErrors((prev) => ({ ...prev, [field]: next[field] }));
  };

  const focusFirstError = (found: EnquiryErrors) => {
    const first = fieldOrder.find((f) => found[f]);
    if (first) document.getElementById(ids(first).input)?.focus();
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const input = readForm();
    const found = validateEnquiry(input);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ state: "idle" });
      focusFirstError(found);
      return;
    }

    const data = new FormData(formRef.current!);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          website: data.get("website") ?? "",
          elapsedMs: startedAt.current ? Date.now() - startedAt.current : 0,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        errors?: EnquiryErrors;
      };

      if (response.ok && result.ok) {
        setStatus({ state: "success" });
        formRef.current?.reset();
        setMessageLength(0);
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }

      if (result.errors && Object.keys(result.errors).length > 0) {
        setErrors(result.errors);
        setStatus({ state: "idle" });
        focusFirstError(result.errors);
        return;
      }

      setStatus({
        state: "error",
        message: result.message ?? "Something went wrong while sending your enquiry. Please try again.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "We couldn’t reach the server. Please check your connection and try again.",
      });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status.state === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start gap-6 border-l-2 border-gold bg-panel p-8 focus:outline-none sm:p-12"
      >
        <CheckCircle2 aria-hidden="true" strokeWidth={1.4} className="size-10 text-white" />
        <h3 className="font-sans font-semibold tracking-tight text-3xl text-white sm:text-4xl">Thank you for reaching out.</h3>
        <p className="text-lg leading-relaxed text-mist/70">
          Your enquiry has been sent. We will read it carefully and respond as soon as we are able.
        </p>
        <button
          type="button"
          className={buttonClasses("secondary")}
          onClick={() => {
            setStatus({ state: "idle" });
            setErrors({});
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const describedBy = (field: EnquiryField, extra?: string) =>
    [errors[field] ? ids(field).error : null, extra].filter(Boolean).join(" ") || undefined;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={`${uid}-privacy`}
      className="space-y-9"
    >
      <div ref={statusRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {status.state === "error" && (
          <div role="alert" className="flex gap-4 border-l-2 border-alert bg-alert/10 p-5">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-alert" />
            <div className="space-y-2 text-mist">
              <p className="font-medium">Your enquiry was not sent.</p>
              <p className="text-mist/70">{status.message}</p>
              {siteConfig.contact.email && (
                <p className="text-mist/70">
                  You can also write to us at{" "}
                  <a className="text-white underline underline-offset-4" href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <Field label="Name" required error={errors.name} ids={ids("name")}>
          <input
            id={ids("name").input}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={limits.name}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            onBlur={() => revalidate("name")}
            onChange={() => revalidate("name")}
            className={inputClasses(Boolean(errors.name))}
          />
        </Field>

        <Field label="Email address" required error={errors.email} ids={ids("email")}>
          <input
            id={ids("email").input}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={limits.email}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            onBlur={() => revalidate("email")}
            onChange={() => revalidate("email")}
            className={inputClasses(Boolean(errors.email))}
          />
        </Field>

        <Field label="Phone number" optional error={errors.phone} ids={ids("phone")}>
          <input
            id={ids("phone").input}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={limits.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            onBlur={() => revalidate("phone")}
            onChange={() => revalidate("phone")}
            className={inputClasses(Boolean(errors.phone))}
          />
        </Field>

        <Field label="Organisation or professional role" optional error={errors.organisation} ids={ids("organisation")}>
          <input
            id={ids("organisation").input}
            name="organisation"
            type="text"
            autoComplete="organization"
            maxLength={limits.organisation}
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={describedBy("organisation")}
            onChange={() => revalidate("organisation")}
            className={inputClasses(Boolean(errors.organisation))}
          />
        </Field>
      </div>

      <Field label="Subject of enquiry" required error={errors.category} ids={ids("category")}>
        <select
          id={ids("category").input}
          name="category"
          required
          aria-required="true"
          defaultValue={initialCategory}
          aria-invalid={Boolean(errors.category)}
          aria-describedby={describedBy("category")}
          onChange={() => revalidate("category")}
          className={`${inputClasses(Boolean(errors.category))} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%23D4AF37'%20stroke-width='1.5'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[right_0.25rem_center] bg-no-repeat pr-10`}
        >
          <option value="" disabled>
            Please choose…
          </option>
          {enquiryCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Your message" required error={errors.message} ids={ids("message")}>
        <textarea
          id={ids("message").input}
          name="message"
          rows={6}
          required
          aria-required="true"
          maxLength={limits.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", `${uid}-message-count`)}
          onBlur={() => revalidate("message")}
          onChange={(e) => {
            setMessageLength(e.target.value.length);
            revalidate("message");
          }}
          className={`${inputClasses(Boolean(errors.message))} resize-y`}
        />
        <p id={`${uid}-message-count`} className="mt-2 text-right text-xs text-mist/45">
          {messageLength} / {limits.message} characters
        </p>
      </Field>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4 border-t border-white/10 pt-8">
        <p id={`${uid}-privacy`} className="text-[0.95rem] leading-relaxed text-mist/60">
          <strong className="font-medium text-mist">Privacy notice:</strong> the details you share
          in this form are used only to read and respond to your enquiry. Please do not include
          personal medical information.
          {siteConfig.privacyPolicyUrl && (
            <>
              {" "}
              Read our{" "}
              <Link href={siteConfig.privacyPolicyUrl} className="text-white underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </>
          )}
        </p>
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-mist">
            <input
              id={ids("consent").input}
              name="consent"
              type="checkbox"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={describedBy("consent")}
              onChange={() => revalidate("consent")}
              className="mt-1 size-5 shrink-0 cursor-pointer accent-gold"
            />
            <span>
              I agree that {siteConfig.name} may use these details to respond to my enquiry.
              <span aria-hidden="true" className="text-gold"> *</span>
            </span>
          </label>
          {errors.consent && <ErrorText id={ids("consent").error}>{errors.consent}</ErrorText>}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className={buttonClasses("primary", "w-full sm:w-auto")}
      >
        {submitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            <span>Sending…</span>
          </>
        ) : (
          <>
            <span>Send enquiry</span>
            <Send aria-hidden="true" className="size-4" />
          </>
        )}
      </button>
      <p className="sr-only" aria-live="polite">
        {submitting ? "Sending your enquiry…" : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  optional,
  error,
  ids,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  ids: { input: string; error: string };
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={ids.input} className="text-sm font-medium tracking-wide text-white">
        {label}
        {required && <span aria-hidden="true" className="text-gold"> *</span>}
        {optional && <span className="font-normal text-mist/45"> (optional)</span>}
      </label>
      {children}
      {error && <ErrorText id={ids.error}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-alert">
      <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
