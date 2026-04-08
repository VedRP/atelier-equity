"use client";
import { useEffect, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
  index?: number;
}

export default function StatCard({ label, value, change, changeType = "neutral", subtitle, index = 0 }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Run once on mount only — index is captured via closure, not a dep
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: index * 0.1, ease: "power2.out" }
      );
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — animate once on mount

  return (
    <div ref={cardRef} className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">{label}</p>
      <p className="text-2xl font-bold text-slate-900 count-up">{value}</p>
      {change && (
        <div className={cn(
          "flex items-center gap-1 mt-1.5 text-xs font-medium",
          changeType === "positive" && "text-emerald-600",
          changeType === "negative" && "text-red-500",
          changeType === "neutral" && "text-slate-500"
        )}>
          {changeType === "positive" && <TrendingUp size={12} />}
          {changeType === "negative" && <TrendingDown size={12} />}
          <span>{change}</span>
        </div>
      )}
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
