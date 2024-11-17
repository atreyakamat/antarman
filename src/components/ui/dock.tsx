"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockProps {
  className?: string;
  children?: React.ReactNode;
}

interface DockIconProps {
  className?: string;
  children?: React.ReactNode;
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, ...props }, ref) => {
    const [mouseX, setMouseX] = useState(0);

    return (
      <div
        ref={ref}
        onMouseMove={(e) => setMouseX(e.pageX)}
        onMouseLeave={() => setMouseX(0)}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 flex h-16 items-start gap-4 rounded-2xl bg-gray-800/50 px-4 backdrop-blur-md",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              mouseX,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

Dock.displayName = "Dock";

const DockIcon = ({ className, children, mouseX, ...props }: DockIconProps & { mouseX?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const calculateHeight = () => {
    if (!ref.current || !mouseX) return 40;
    const bounds = ref.current.getBoundingClientRect();
    const center = bounds.x + bounds.width / 2;
    const distance = mouseX - center;
    
    if (Math.abs(distance) > 150) return 40;
    return 48 - (Math.abs(distance) / 150) * 8;
  };

  const height = calculateHeight();

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        height: `${height}px`,
        width: `${height}px`,
      }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "min-w-[40px] min-h-[40px] relative flex items-center justify-center rounded-full bg-gray-700/50 text-white/50 hover:text-white/75 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon };
