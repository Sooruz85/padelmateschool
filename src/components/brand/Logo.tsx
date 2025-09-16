"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function Logo({ variant = "dark", className }: LogoProps) {
  const fill = variant === "dark" ? "#FFFFFF" : "#0B140B";
  const handleFill = variant === "dark" ? "#FFFFFF" : "#0B140B";
  const holeFill = variant === "dark" ? "#0B140B" : "#FFFFFF";

  return (
    <svg
      className={cn("h-8 w-auto", className)}
      viewBox="0 0 420 64"
      role="img"
      aria-label="PadelMate logo"
    >
      <title>PadelMate</title>
      {/* Padel */}
      <g fill={fill} transform="translate(24,44)">
        <path d="M0-8h14c6 0 10 3.8 10 9.5S20 11 14 11H0V-8zm6 5v14h8c3.1 0 5-1.9 5-4.9S17.1-3 14-3H6z" />
        <path d="M34 11V-8h6V11h-6z" />
        <path d="M46.5 1.5c0-5.8 4.6-10.5 10.5-10.5 5.9 0 10.5 4.7 10.5 10.5S62.9 12 57 12c-5.9 0-10.5-4.7-10.5-10.5zm6 0c0 2.9 2.3 5 4.5 5 2.2 0 4.5-2.1 4.5-5s-2.3-5-4.5-5c-2.2 0-4.5 2.1-4.5 5z" />
        <path d="M82-8h6v3.1C89.3-7 92.3-9 96.6-9c6 0 10.4 4.7 10.4 10.5S102.6 12 96.6 12c-3.7 0-6.6-1.8-8.6-4.5V11h-6V-8zm18 9.5c0-2.9-2.3-5-5-5-2.7 0-5 2.1-5 5s2.3 5 5 5c2.7 0 5-2.1 5-5z" />
        <path d="M122 11V-8h6V-4.7c1.7-2.3 4.4-3.8 7.7-3.8 5.8 0 10 4.1 10 10.6V11h-6V2.1c0-3.9-2.5-6.1-6-6.1-3.4 0-5.7 2.3-5.7 6.1V11h-6z" />
      </g>
      {/* Racket icon between words */}
      <g transform="translate(210,32)">
        <circle cx="0" cy="0" r="12" fill={fill} />
        <circle cx="-4" cy="-2" r="1.2" fill={holeFill} />
        <circle cx="0" cy="-4" r="1.2" fill={holeFill} />
        <circle cx="4" cy="-2" r="1.2" fill={holeFill} />
        <rect x="-1" y="10" width="2" height="10" rx="1" fill={handleFill} />
      </g>
      {/* Mate */}
      <g fill={fill} transform="translate(240,44)">
        <path d="M0 11V-8h6l8 10 8-10h6V11h-6V0l-8 9-8-9v11H0z" />
        <path d="M44.5 1.5C44.5-4.3 49.1-9 55-9c5.9 0 10.5 4.7 10.5 10.5S60.9 12 55 12c-5.9 0-10.5-4.7-10.5-10.5zm6 0c0 2.9 2.3 5 4.5 5 2.2 0 4.5-2.1 4.5-5s-2.3-5-4.5-5c-2.2 0-4.5 2.1-4.5 5z" />
        <path d="M82-8h6v3.1C89.3-7 92.3-9 96.6-9c6 0 10.4 4.7 10.4 10.5S102.6 12 96.6 12c-3.7 0-6.6-1.8-8.6-4.5V11h-6V-8zm18 9.5c0-2.9-2.3-5-5-5-2.7 0-5 2.1-5 5s2.3 5 5 5c2.7 0 5-2.1 5-5z" />
        <path d="M122 11V-3h-6v-5h6v-4h6v4h8v5h-8V11h-6z" />
      </g>
    </svg>
  );
}

export default Logo;
