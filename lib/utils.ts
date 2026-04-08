import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (compact && Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case "Low": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "Medium": return "bg-amber-50 text-amber-700 border border-amber-200";
    case "High": return "bg-red-50 text-red-700 border border-red-200";
    default: return "bg-gray-100 text-gray-600";
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Completed": return "bg-emerald-50 text-emerald-700";
    case "Pending": return "bg-amber-50 text-amber-700";
    case "Settled": return "bg-blue-50 text-blue-700";
    case "Failed": return "bg-red-50 text-red-700";
    case "Active": return "bg-emerald-50 text-emerald-700";
    case "Suspended": return "bg-red-50 text-red-700";
    default: return "bg-gray-100 text-gray-600";
  }
}

export function getTransactionTypeColor(type: string): string {
  switch (type) {
    case "Capital Call": return "bg-blue-50 text-blue-700 border border-blue-200";
    case "Distribution": return "bg-orange-50 text-orange-700 border border-orange-200";
    case "Direct Equity": return "bg-purple-50 text-purple-700 border border-purple-200";
    case "Commitment": return "bg-slate-100 text-slate-700 border border-slate-200";
    case "ACH Transfer": return "bg-teal-50 text-teal-700 border border-teal-200";
    case "Platform Fee": return "bg-gray-100 text-gray-600 border border-gray-200";
    default: return "bg-gray-100 text-gray-600";
  }
}

export function getIndustryColor(industry: string): string {
  switch (industry) {
    case "Real Estate": return "#3b5bdb";
    case "Venture Capital": return "#7c3aed";
    case "Private Debt": return "#0891b2";
    default: return "#64748b";
  }
}

export function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
