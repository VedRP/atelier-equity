import { cn, getRiskColor, getStatusColor } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "risk" | "status" | "default";
  riskLevel?: string;
  status?: string;
  className?: string;
}

export default function Badge({ children, variant = "default", riskLevel, status, className }: BadgeProps) {
  let colorClass = "bg-slate-100 text-slate-600";

  if (variant === "risk" && riskLevel) colorClass = getRiskColor(riskLevel);
  if (variant === "status" && status) colorClass = getStatusColor(status);

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", colorClass, className)}>
      {children}
    </span>
  );
}
