"use client";
import { useEffect, useRef } from "react";
import { TrendingUp, Plus, RefreshCw } from "lucide-react";
import gsap from "gsap";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/ui/StatCard";
import GrowthChart from "@/components/charts/GrowthChart";
import AllocationChart from "@/components/charts/AllocationChart";
import { mockTransactions } from "@/lib/mockData";
import { formatCurrency, getStatusColor, getTransactionTypeColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(tableRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div ref={headerRef} className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Atelier Equity</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-400">Insights</span>
          </div>
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Net Worth</p>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-slate-900">$4,280,500.00</h1>
            <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
              <TrendingUp size={12} /> +12.4%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Markets Open
          </div>
          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Invested" value="$3,150,000" change="Committed capital" changeType="neutral" index={0} />
        <StatCard label="Portfolio Value" value="$3,842,120" change="+$42,000 vs last month" changeType="positive" index={1} />
        <StatCard label="Total P/L" value="+$692,120" change="Unrealized gains" changeType="positive" index={2} />
        <StatCard label="Overall ROI" value="21.9%" change="Top 5% of peer group" changeType="positive" subtitle="● Top 5% of peer group" index={3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <GrowthChart />
        </div>
        <AllocationChart />
      </div>

      {/* Recent Activity */}
      <div ref={tableRef} className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[10px] text-slate-400">Markets Open · Last sync 2m ago</span>
            </div>
          </div>
          <Link href="/portfolio" className="text-xs text-[#3b5bdb] font-medium hover:underline">View All History</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Date", "Asset Class", "Entity", "Type", "Amount", "Status"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTransactions.slice(0, 5).map((tx, i) => (
                <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{tx.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{tx.assetClass}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.entity}</td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide", getTransactionTypeColor(tx.type))}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={cn("px-6 py-4 text-sm font-semibold tabular-nums", tx.type === "Distribution" ? "text-emerald-600" : "text-slate-900")}>
                    {tx.type === "Distribution" ? "+" : ""}{formatCurrency(Math.abs(tx.amount))}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(tx.status))}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Atelier Equity Terminal v4.2.1</p>
          <Link href="/wallet" className="text-xs text-[#3b5bdb] font-medium hover:underline">View all transactions →</Link>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-[#3b5bdb] hover:bg-[#2f4ac4] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center active:scale-95">
        <Plus size={20} />
      </button>
    </DashboardLayout>
  );
}
