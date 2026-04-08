"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { dashboardGrowthData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

const ranges = ["6M", "1Y", "ALL"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-bold text-slate-900">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function GrowthChart() {
  const [range, setRange] = useState("1Y");

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Growth Projection</h3>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                range === r ? "bg-[#3b5bdb] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={dashboardGrowthData} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Bar dataKey="value" fill="#3b5bdb" radius={[6, 6, 0, 0]}
            label={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
