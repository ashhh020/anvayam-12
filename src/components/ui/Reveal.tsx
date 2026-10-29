"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fades content in once it scrolls into view. The hidden starting state is
 * defined in CSS behind `prefers-reduced-motion: no-preference`, so users who
 * prefer reduced motion (and users without JS, via <noscript>) see content
 * immediately.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "fade",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: "fade" | "image";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${variant === "image" ? "reveal-image" : "reveal"} ${className}`}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
