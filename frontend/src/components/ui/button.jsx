import React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-purple-600 text-purple-600 bg-white hover:bg-purple-50",
    ghost: "bg-transparent text-purple-600 hover:bg-purple-100",
  };
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
  );
});
Button.displayName = "Button"

export { Button } 