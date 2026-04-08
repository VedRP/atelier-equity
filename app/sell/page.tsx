"use client";
import { useEffect, useRef, useState } from "react";
import { TrendingDown, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import gsap from "gsap";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { mockInvestments } from "@/lib/mockData";
import { formatCurrency, cn } from "@/lib/utils";
import type { Investment } from "@/lib/types";

type OrderStatus = "idle" | "pending" | "success";

export default function SellPage() {
  const [selected, setSelected] = useState<Investment | null>(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("idle");
  const [confirmModal, setConfirmModal] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current?.children ?? [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, []);

  const handleSelect = (inv: Investment) => {
    setSelected(inv);
    setPrice(inv.currentPrice.toString());
    setQuantity("");
    setOrderStatus("idle");
  };

  const handleSubmit = async () => {
    setConfirmModal(false);
    setOrderStatus("pending");
    await new Promise((r) => setTimeout(r, 1500));
    setOrderStatus("success");
  };

  const total = selected && quantity && price ? parseFloat(quantity) * parseFloat(price) : 0;

  return (
    <DashboardLayout title="Sell Shares">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings list */}
        <div className="lg:col-span-1">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Your Holdings</h3>
          <div ref={cardsRef} className="space-y-2">
            {mockInvestments.map((inv) => (
              <button
                key={inv.id}
                onClick={() => handleSelect(inv)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200",
                  selected?.id === inv.id
                    ? "border-[#3b5bdb] bg-[#3b5bdb]/5 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#3b5bdb] flex items-center justify-center text-white text-xs font-bold">
                      {inv.companyName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 leading-tight">{inv.companyName}</p>
                      <p className="text-xs text-slate-400">{inv.sharesOwned} shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{formatCurrency(inv.currentPrice)}</p>
                    <p className="text-xs text-emerald-600">+{inv.pnlPercent.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Value: {formatCurrency(inv.currentValue)}</span>
                  <span className="text-emerald-600">+{formatCurrency(inv.pnl)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sell form */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <TrendingDown size={32} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm text-slate-400">Select a holding to create a sell order</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Sell Order</h3>
                  <p className="text-sm text-slate-500">{selected.companyName}</p>
                </div>
                {orderStatus === "success" && (
                  <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-medium">
                    <CheckCircle2 size={14} /> Order Placed
                  </div>
                )}
                {orderStatus === "pending" && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full text-sm font-medium">
                    <Clock size={14} /> Processing...
                  </div>
                )}
              </div>

              {/* Position summary */}
              <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Shares Owned</p>
                  <p className="text-lg font-bold text-slate-900">{selected.sharesOwned}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Avg. Cost</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(selected.purchasePrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Current Price</p>
                  <p className="text-lg font-bold text-emerald-600">{formatCurrency(selected.currentPrice)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Quantity to Sell"
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  error={quantity && parseInt(quantity) > selected.sharesOwned ? `Max ${selected.sharesOwned} shares` : undefined}
                />
                <Input
                  label="Limit Price (USD)"
                  type="number"
                  placeholder={selected.currentPrice.toString()}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {total > 0 && (
                <div className="bg-[#3b5bdb]/5 border border-[#3b5bdb]/20 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Gross proceeds</span>
                    <span className="font-semibold">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Platform fee (0.5%)</span>
                    <span className="font-semibold text-red-500">-{formatCurrency(total * 0.005)}</span>
                  </div>
                  <div className="border-t border-[#3b5bdb]/20 pt-2 flex justify-between">
                    <span className="font-semibold text-slate-900">Net proceeds</span>
                    <span className="font-bold text-[#3b5bdb]">{formatCurrency(total * 0.995)}</span>
                  </div>
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">Sell orders on the secondary market may take 3-5 business days to settle. Prices are subject to market conditions.</p>
              </div>

              <Button
                className="w-full"
                size="lg"
                disabled={!quantity || !price || parseInt(quantity) > selected.sharesOwned || orderStatus === "pending" || orderStatus === "success"}
                onClick={() => setConfirmModal(true)}
              >
                Place Sell Order
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <Modal open={confirmModal} onClose={() => setConfirmModal(false)} title="Confirm Sell Order" size="sm">
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Company</span><span className="font-medium">{selected?.companyName}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Quantity</span><span className="font-medium">{quantity} shares</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Limit Price</span><span className="font-medium">{formatCurrency(parseFloat(price || "0"))}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-2"><span className="font-semibold">Net Proceeds</span><span className="font-bold text-[#3b5bdb]">{formatCurrency(total * 0.995)}</span></div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmModal(false)}>Cancel</Button>
            <Button className="flex-1" onClick={handleSubmit}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
