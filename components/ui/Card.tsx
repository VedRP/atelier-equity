import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({ children, className, hover, glass }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]",
        hover && "transition-all duration-200 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.10)] hover:-translate-y-0.5 cursor-pointer",
        glass && "bg-white/70 backdrop-blur-md border-white/50",
        className
      )}
    >
      {children}
    </div>
  );
}
