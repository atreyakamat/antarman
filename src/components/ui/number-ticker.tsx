"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

export default function NumberTicker({
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  direction: "up";
  className?: string;
  delay?: number; // delay in s
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Function to calculate and update the visitor count
  const updateVisitorCount = (visitorCount: number) => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "up" ? 0 : visitorCount);
      }, delay * 1000);
    }
  };

  useEffect(() => {
    // Simulate fetching visitor count from a global state or context
    const visitorCount = 1000; // Replace with actual visitor count logic
    updateVisitorCount(visitorCount);
  }, [direction, delay, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces],
  );

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black dark:text-white tracking-wider",
        className,
      )}
      ref={ref}
    />
  );
}
