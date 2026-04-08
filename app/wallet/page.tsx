"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Filter, Download, Building2, CheckCircle2, AlertTriangle } from "lucide-react";
import gsap from "gsap";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { mockTransactions, walletStats } from "@/lib/mockData";
import { formatCurrency, getStatusColor, getTransactionTypeColor, cn } from "@/lib/utils";

export default function WalletPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [addModal, setAddModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      gsap.fromTo(statsRef.current?.children ?? [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, delay: 0.2, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  const txIcons: Record<string, React.ReactNode> = {
    "Distribution": <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center"><ArrowDownLeft size={16} className="text-orange-600" /></div>,
    "Capital Call": <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center"><ArrowUpRight size={16} className="text-blue-600" /></div>,
    "ACH Transfer": <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"><Building2 size={16} className="text-slate-600" /></div>,
    "Platform Fee": <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center"><ArrowUpRight size={16} className="text-red-500" /></div>,
    "Direct Equity": <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center"><ArrowUpRight size={16} className="text-purple-600" /></div>,
    "Commitment": <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"><ArrowUpRight size={16} className="text-slate-600" /></div>,
  };

  return (
    <DashboardLayout title="Wallet & Capital">
      {/* Hero card */}
      <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-[#3b5bdb] rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">Total Available Liquidity</p>
            <p className="text-4xl font-bold mb-1">{formatCurrency(walletStats.totalLiquidity)}</p>
            <div className="flex items-center gap-1.5 text-sm text-blue-200 mb-6">
              <span className="text-emerald-300">↑</span>
              +{walletStats.yieldYTD}% yield YTD
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setAddModal(true)} className="bg-white text-[#3b5bdb] hover:bg-blue-50 border-0">
                <ArrowDownLeft size={16} /> Add Funds
              </Button>
              <Button onClick={() => setWithdrawModal(true)} className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                <ArrowUpRight size={16} /> Withdraw
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-slate-700">Linked Account</p>
            <CheckCircle2 size={18} className="text-[#3b5bdb]" />
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <Building2 size={18} className="text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Atelier Trust & Savings</p>
              <p className="text-xs text-slate-400">•••• 8829 (Checking)</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mb-3">Last synced today at 09:42 AM. Real-time transfers enabled for amounts up to $5M.</p>
          <button className="text-xs text-[#3b5bdb] font-medium hover:underline">Manage Connectivity →</button>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "In Transit", value: formatCurrency(walletStats.inTransit), sub: null, warn: false },
          { label: "Committed Capital", value: formatCurrency(walletStats.committedCapital), sub: "3 Call notices pending", warn: true },
          { label: "Reserved for Fees", value: formatCurrency(walletStats.reservedForFees), sub: "Next quarterly billing: Oct 15", warn: false },
          { label: "Currency", value: walletStats.currency, sub: "Multi-currency enabled", warn: false },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-xl font-bold text-slate-900">{s.value}</p>
            {s.sub && (
              <p className={cn("text-xs mt-1 flex items-center gap-1", s.warn ? "text-amber-600" : "text-slate-400")}>
                {s.warn && <AlertTriangle size={10} />}{s.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Transaction History</h3>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm"><Filter size={12} /> Filter</Button>
            <Button variant="secondary" size="sm"><Download size={12} /> Export</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Transaction", "Type", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx) => {
                const isPositive = tx.type === "Distribution" || tx.type === "ACH Transfer";
                return (
                  <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {txIcons[tx.type] || txIcons["Commitment"]}
                        <div>
                          <p className="text-sm font-medium text-slate-800">{tx.entity}</p>
                          <p className="text-xs text-slate-400">{tx.assetClass}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{tx.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{tx.date}</td>
                    <td className={cn("px-6 py-4 text-sm font-semibold tabular-nums", isPositive ? "text-emerald-600" : "text-slate-900")}>
                      {isPositive ? "+" : "-"}{formatCurrency(Math.abs(tx.amount))}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(tx.status))}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Showing {mockTransactions.length} of 128 transactions</p>
          <div className="flex items-center gap-2">
            <button className="text-xs text-slate-500 hover:text-slate-700 font-medium">Previous</button>
            <button className="text-xs text-[#3b5bdb] font-medium hover:underline">Next Page</button>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      <Modal open={addModal} onClose={() => setAddModal(false)} title="Add Funds" size="sm">
        <div className="space-y-4">
          <Input label="Amount (USD)" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600">
            Funds will be transferred from <span className="font-medium">Atelier Trust ••8829</span>
          </div>
          <Button className="w-full" onClick={() => setAddModal(false)}>Confirm Transfer</Button>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal open={withdrawModal} onClose={() => setWithdrawModal(false)} title="Withdraw Funds" size="sm">
        <div className="space-y-4">
          <Input label="Amount (USD)" type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
            Withdrawals typically process within 1-3 business days.
          </div>
          <Button className="w-full" onClick={() => setWithdrawModal(false)}>Request Withdrawal</Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
