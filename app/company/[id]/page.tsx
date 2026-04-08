"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin, Users, Calendar, FileText, Download, TrendingUp, Building2 } from "lucide-react";
import gsap from "gsap";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CompanyChart from "@/components/charts/CompanyChart";
import { mockCompanies } from "@/lib/mockData";
import { formatCurrency, getRiskColor, cn } from "@/lib/utils";

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const company = mockCompanies.find((c) => c.id === id);
  const [buyModal, setBuyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(heroRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      tl.fromTo(sectionsRef.current?.children ?? [], { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  if (!company) {
    return (
      <DashboardLayout title="Company Not Found">
        <div className="text-center py-20">
          <p className="text-slate-500">Company not found.</p>
          <Link href="/marketplace"><Button variant="secondary" className="mt-4">Back to Marketplace</Button></Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Hero */}
      <div ref={heroRef}>
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors">
          <ArrowLeft size={14} /> Back to Marketplace
        </Link>

        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#3b5bdb] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                {company.logo}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-slate-900">{company.name}</h1>
                  <Badge variant="risk" riskLevel={company.riskLevel}>{company.riskLevel} Risk</Badge>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{company.industry}</span>
                </div>
                <p className="text-sm text-slate-500 mt-1 max-w-xl">{company.description}</p>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={11} />{company.headquarters}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><Users size={11} />{company.employees} employees</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400"><Calendar size={11} />Founded {company.founded}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-xs text-slate-400">Valuation</p>
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(company.valuation, true)}</p>
              </div>
              <Button onClick={() => setBuyModal(true)} size="lg">
                Buy Shares — {formatCurrency(company.pricePerShare)}/share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div ref={sectionsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Price/Share", value: formatCurrency(company.pricePerShare) },
              { label: "ROI", value: `+${company.roi}%`, green: true },
              { label: "Revenue", value: formatCurrency(company.revenue, true) },
              { label: "Growth", value: `+${company.growth}%`, green: true },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{m.label}</p>
                <p className={cn("text-lg font-bold", m.green ? "text-emerald-600" : "text-slate-900")}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Share Price History</h3>
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <TrendingUp size={12} /> +{company.roi}% YTD
              </span>
            </div>
            <CompanyChart data={company.chartData} />
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Documents</h3>
            {company.documents.length === 0 ? (
              <p className="text-sm text-slate-400">No documents available.</p>
            ) : (
              <div className="space-y-2">
                {company.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#3b5bdb]/10 rounded-lg flex items-center justify-center">
                        <FileText size={14} className="text-[#3b5bdb]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                        <p className="text-xs text-slate-400">{doc.type} · {doc.size} · {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick buy */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Quick Buy</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Available shares</span>
                <span className="font-semibold">{company.availableShares.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Min. investment</span>
                <span className="font-semibold">{formatCurrency(company.pricePerShare)}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#3b5bdb] rounded-full" style={{ width: `${((company.totalShares - company.availableShares) / company.totalShares) * 100}%` }} />
              </div>
              <p className="text-xs text-slate-400">{Math.round(((company.totalShares - company.availableShares) / company.totalShares) * 100)}% of shares sold</p>
              <Button className="w-full" onClick={() => setBuyModal(true)}>Invest Now</Button>
            </div>
          </div>

          {/* Company info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Company Info</h3>
            <div className="space-y-3">
              {[
                { label: "Market Type", value: company.marketType === "primary" ? "Primary Market" : "Secondary Market" },
                { label: "Headquarters", value: company.headquarters },
                { label: "Founded", value: company.founded },
                { label: "Employees", value: company.employees },
                { label: "Total Shares", value: company.totalShares.toLocaleString() },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-700 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      <Modal open={buyModal} onClose={() => setBuyModal(false)} title={`Buy Shares — ${company.name}`} size="md">
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-slate-400">Price per share</p>
              <p className="text-lg font-bold text-slate-900">{formatCurrency(company.pricePerShare)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Available</p>
              <p className="text-lg font-bold text-slate-900">{company.availableShares.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1.5">Quantity</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 font-bold transition-colors">−</button>
              <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="flex-1 text-center py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20" />
              <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 font-bold transition-colors">+</button>
            </div>
          </div>
          <div className="bg-[#3b5bdb]/5 border border-[#3b5bdb]/20 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-slate-600">Subtotal</span><span className="font-semibold">{formatCurrency(company.pricePerShare * quantity)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-slate-600">Platform fee (0.5%)</span><span className="font-semibold">{formatCurrency(company.pricePerShare * quantity * 0.005)}</span></div>
            <div className="border-t border-[#3b5bdb]/20 pt-2 flex justify-between">
              <span className="font-semibold text-slate-900">Total</span>
              <span className="font-bold text-[#3b5bdb]">{formatCurrency(company.pricePerShare * quantity * 1.005)}</span>
            </div>
          </div>
          <Button className="w-full" size="lg" onClick={() => setBuyModal(false)}>Confirm Purchase</Button>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
