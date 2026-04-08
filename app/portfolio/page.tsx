"use client";
import { useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, PieChart } from "lucide-react";
import gsap from "gsap";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { mockInvestments } from "@/lib/mockData";
import { formatCurrency, cn } from "@/lib/utils";
import Link from "next/link";

export default function PortfolioPage() {
  const rowsRef = useRef<HTMLTableSectionElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const totalInvested = mockInvestments.reduce((s, i) => s + i.investedAmount, 0);
  const totalValue = mockInvestments.reduce((s, i) => s + i.currentValue, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPct = ((totalPnl / totalInvested) * 100).toFixed(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(summaryRef.current?.children ?? [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
      gsap.fromTo(rowsRef.current?.querySelectorAll("tr") ?? [], { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, delay: 0.3, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout title="Portfolio">
      {/* Summary */}
      <div ref={summaryRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Invested", value: formatCurrency(totalInvested), sub: `${mockInvestments.length} positions` },
          { label: "Current Value", value: formatCurrency(totalValue), sub: "Mark-to-market" },
          { label: "Total P&L", value: formatCurrency(totalPnl), sub: "Unrealized", positive: true },
          { label: "Overall Return", value: `+${totalPnlPct}%`, sub: "Since inception", positive: true },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
            <p className={cn("text-2xl font-bold", s.positive ? "text-emerald-600" : "text-slate-900")}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Holdings</h3>
          <span className="text-xs text-slate-400">{mockInvestments.length} positions</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Company", "Industry", "Shares", "Avg. Cost", "Current Price", "Invested", "Current Value", "P&L", "Return"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody ref={rowsRef}>
              {mockInvestments.map((inv) => (
                <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/company/${inv.companyId}`} className="flex items-center gap-2 group">
                      <div className="w-8 h-8 rounded-lg bg-[#3b5bdb] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {inv.companyName.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-800 group-hover:text-[#3b5bdb] transition-colors whitespace-nowrap">{inv.companyName}</span>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">{inv.industry}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{inv.sharesOwned}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 tabular-nums">{formatCurrency(inv.purchasePrice)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800 tabular-nums">{formatCurrency(inv.currentPrice)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 tabular-nums">{formatCurrency(inv.investedAmount)}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 tabular-nums">{formatCurrency(inv.currentValue)}</td>
                  <td className="px-6 py-4">
                    <div className={cn("flex items-center gap-1 text-sm font-semibold tabular-nums", inv.pnl >= 0 ? "text-emerald-600" : "text-red-500")}>
                      {inv.pnl >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {inv.pnl >= 0 ? "+" : ""}{formatCurrency(inv.pnl)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("text-sm font-bold tabular-nums", inv.pnlPercent >= 0 ? "text-emerald-600" : "text-red-500")}>
                      {inv.pnlPercent >= 0 ? "+" : ""}{inv.pnlPercent.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
