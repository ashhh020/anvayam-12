"use client";

/** Rendered on the client so the year stays current between deployments. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
