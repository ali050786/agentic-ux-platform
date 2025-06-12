import React from "react";
import { cn } from "../../lib/utils";

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2";
  const variants = {
    default: "bg-yellow-100 text-yellow-800 border border-yellow-500",
    outline: "bg-yellow-100 text-yellow-800 border border-yellow-500",
  };
  return (
    <span ref={ref} className={cn(base, variants[variant], className)} {...props} />
  );
});
Badge.displayName = "Badge";

export { Badge }; 