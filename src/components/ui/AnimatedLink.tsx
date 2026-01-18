// ============================================================================
// ANIMATED LINK - Link with Animated Underline
// ============================================================================

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  underlineColor?: string;
  underlineHeight?: number;
}

export function AnimatedLink({
  href,
  children,
  className,
  external = false,
  underlineColor = "currentColor",
  underlineHeight = 1,
}: AnimatedLinkProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const content = (
    <span className="relative inline-block">
      {children}
      <span
        className="absolute bottom-0 left-1/2 w-0 -translate-x-1/2 transition-[width] duration-300 group-hover:w-full"
        style={{
          height: underlineHeight,
          backgroundColor: underlineColor,
        }}
      />
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        className={cn("group", className)}
        {...linkProps}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn("group", className)}>
      {content}
    </Link>
  );
}
