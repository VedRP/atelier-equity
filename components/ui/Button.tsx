"use client";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-[#3b5bdb] hover:bg-[#2f4ac4] text-white focus:ring-[#3b5bdb] shadow-sm hover:shadow-md active:scale-[0.98]",
      secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 focus:ring-slate-300 shadow-sm hover:shadow-md active:scale-[0.98]",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-200",
      danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 shadow-sm active:scale-[0.98]",
      outline: "bg-transparent border border-[#3b5bdb] text-[#3b5bdb] hover:bg-[#3b5bdb] hover:text-white focus:ring-[#3b5bdb] active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
