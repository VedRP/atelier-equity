"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { assetAllocationData } from "@/lib/mockData";

export default function AllocationChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">Asset Allocation</h3>
      <div className="flex flex-col items-center">
        <div className="relative">
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={assetAllocationData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {assetAllocationData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-2xl font-bold text-slate-900">62%</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Real Estate</p>
          </div>
        </div>
        <div className="w-full mt-3 space-y-2">
          {assetAllocationData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600">{item.name}</span>
              </div>
              <span className="text-xs font-semibold text-slate-800">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
