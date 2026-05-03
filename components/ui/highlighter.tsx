"use client";

import { useEffect, useRef, useState } from "react";
import { annotate } from "rough-notation";
import { useInView } from "framer-motion";

export type HighlighterProps = {
  children: React.ReactNode;
  color?: string;
  action?: "highlight" | "circle" | "box" | "bracket" | "crossed-off" | "strike-through" | "underline";
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number;
  multiline?: boolean;
  isView?: boolean;
};

export function Highlighter({
  children,
  color = "#ffd1dc",
  action = "highlight",
  strokeWidth = 1.5,
  animationDuration = 500,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [annotation, setAnnotation] = useState<any>(null);

  useEffect(() => {
    if (ref.current) {
      const a = annotate(ref.current, {
        type: action,
        color: color,
        strokeWidth: strokeWidth,
        animationDuration: animationDuration,
        iterations: iterations,
        padding: padding,
        multiline: multiline,
      });
      setAnnotation(a);
      
      // If we don't care about viewport or if it's already in view
      if (!isView) {
        a.show();
      }

      return () => a.remove();
    }
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline, isView]);

  useEffect(() => {
    if (isView && isInView && annotation) {
      annotation.show();
    }
  }, [isInView, isView, annotation]);

  return (
    <span ref={ref as any} className="relative inline-block">
      {children}
    </span>
  );
}
