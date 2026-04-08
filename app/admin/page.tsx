"use client";
import { useState } from "react";
import { Users, Building2, BarChart3, DollarSign, TrendingUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/ui/Button";
import { mockAdminUsers, mockCompanies, commissionData } from "@/lib/mockData";
import { formatCurrency, getStatusColor, cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const tabs = ["Users", "Companies", "Commission"];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Users");
  const [commissionRate, setCommissionRate] = useState("0.5");

  return (
    <DashboardLayout title="Admin Panel">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: "1,284", icon: Users, color: "bg-blue-50 text-blue-600" },
          { label: "Active Companies", value: "42", icon: Building2, color: "bg-purple-50 text-purple-600" },
          { label: "Total AUM", value: "$284M", icon: BarChart3, color: "bg-emerald-50 text-emerald-600" },
          { label: "Monthly Revenue", value: "$91,000", icon: DollarSign, color: "bg-amber-50 text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.color)}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-xl font-bold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Users Tab */}
      {activeTab === "Users" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">User Management</h3>
            <Button size="sm">Add User</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["User", "Role", "KYC", "Joined", "Total Invested", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockAdminUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#3b5bdb] flex items-center justify-center text-white text-xs font-bold">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{user.role}</td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                        user.kycStatus === "Verified" ? "bg-emerald-50 text-emerald-700" :
                        user.kycStatus === "Pending" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                      )}>
                        {user.kycStatus === "Verified" ? <CheckCircle2 size={10} /> : user.kycStatus === "Pending" ? <Clock size={10} /> : <XCircle size={10} />}
                        {user.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{user.joinedAt}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800 tabular-nums">{formatCurrency(user.totalInvested)}</td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(user.status))}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">Suspend</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Companies Tab */}
      {activeTab === "Companies" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Company Approvals</h3>
            <Button size="sm">Add Company</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Company", "Industry", "Valuation", "ROI", "Risk", "Market", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockCompanies.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3b5bdb] flex items-center justify-center text-white text-xs font-bold">{c.logo}</div>
                        <span className="text-sm font-medium text-slate-800">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.industry}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{formatCurrency(c.valuation, true)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">+{c.roi}%</td>
                    <td className="px-6 py-4">
                      <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                        c.riskLevel === "Low" ? "bg-emerald-50 text-emerald-700" :
                        c.riskLevel === "Medium" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                      )}>{c.riskLevel}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 capitalize">{c.marketType}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">Remove</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Commission Tab */}
      {activeTab === "Commission" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Monthly Revenue</h3>
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp size={10} /> +14.2% YoY
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={commissionData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Bar dataKey="revenue" fill="#3b5bdb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Commission Rates</h3>
              <div className="space-y-3">
                {[
                  { label: "Buy Orders", rate: commissionRate, setRate: setCommissionRate },
                  { label: "Sell Orders", rate: "0.5", setRate: () => {} },
                  { label: "Withdrawals", rate: "0.25", setRate: () => {} },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => item.setRate(e.target.value)}
                        step="0.1"
                        min="0"
                        max="5"
                        className="w-16 text-center py-1 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20"
                      />
                      <span className="text-sm text-slate-400">%</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" size="sm">Save Rates</Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">YTD Summary</h3>
              <div className="space-y-2">
                {[
                  { label: "Total Revenue", value: "$751,000" },
                  { label: "Transactions", value: "4,821" },
                  { label: "Avg. per Trade", value: "$155.77" },
                ].map((s) => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span className="text-slate-400">{s.label}</span>
                    <span className="font-semibold text-slate-800">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
