"use client";
import { useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal, TrendingUp, Users } from "lucide-react";
import gsap from "gsap";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { mockCompanies } from "@/lib/mockData";
import { formatCurrency, getRiskColor, cn } from "@/lib/utils";
import type { Company } from "@/lib/types";
import Link from "next/link";

const industries = ["All", "Real Estate", "Venture Capital", "Private Debt"];
const risks = ["All", "Low", "Medium", "High"];
const markets = ["All", "Primary", "Secondary"];

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");
  const [risk, setRisk] = useState("All");
  const [market, setMarket] = useState("All");
  const [sort, setSort] = useState("roi");
  const [buyModal, setBuyModal] = useState<Company | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"primary" | "secondary">("primary");
  const cardsRef = useRef<HTMLDivElement>(null);

  const filtered = mockCompanies.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.industry.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = industry === "All" || c.industry === industry;
    const matchRisk = risk === "All" || c.riskLevel === risk;
    const matchMarket = market === "All" || c.marketType === market.toLowerCase();
    const matchTab = c.marketType === activeTab;
    return matchSearch && matchIndustry && matchRisk && matchMarket && matchTab;
  }).sort((a, b) => {
    if (sort === "roi") return b.roi - a.roi;
    if (sort === "price") return a.pricePerShare - b.pricePerShare;
    if (sort === "valuation") return b.valuation - a.valuation;
    return 0;
  });

  useEffect(() => {
    if (!cardsRef.current) return;
    const ctx = gsap.context(() => {
      const cards = cardsRef.current!.querySelectorAll(".company-card");
      // Kill any running tweens on these targets before starting new ones
      gsap.killTweensOf(cards);
      gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" });
    }, cardsRef);
    return () => ctx.revert();
  }, [activeTab]); // only re-animate when tab switches, not on every filter keystroke

  const industryColors: Record<string, string> = {
    "Real Estate": "bg-blue-100 text-blue-700",
    "Venture Capital": "bg-purple-100 text-purple-700",
    "Private Debt": "bg-teal-100 text-teal-700",
  };

  return (
    <DashboardLayout title="Marketplace">
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit mb-6">
        {(["primary", "secondary"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize",
              activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {tab} Market
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20 focus:border-[#3b5bdb] transition-all"
          />
        </div>

        <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20 text-slate-700">
          {industries.map((i) => <option key={i}>{i}</option>)}
        </select>

        <select value={risk} onChange={(e) => setRisk(e.target.value)} className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20 text-slate-700">
          {risks.map((r) => <option key={r}>{r}</option>)}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20 text-slate-700">
          <option value="roi">Sort: ROI</option>
          <option value="price">Sort: Price</option>
          <option value="valuation">Sort: Valuation</option>
        </select>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <SlidersHorizontal size={12} />
          {filtered.length} results
        </div>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((company) => (
          <div
            key={company.id}
            className="company-card bg-white rounded-xl border border-slate-200 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3b5bdb] flex items-center justify-center text-white text-sm font-bold">
                  {company.logo}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#3b5bdb] transition-colors">{company.name}</h3>
                  <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", industryColors[company.industry] || "bg-slate-100 text-slate-600")}>
                    {company.industry}
                  </span>
                </div>
              </div>
              <Badge variant="risk" riskLevel={company.riskLevel}>{company.riskLevel}</Badge>
            </div>

            <p className="text-xs text-slate-500 mb-4 line-clamp-2">{company.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Price/Share</p>
                <p className="text-sm font-bold text-slate-900">{formatCurrency(company.pricePerShare)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">ROI</p>
                <p className="text-sm font-bold text-emerald-600">+{company.roi}%</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Valuation</p>
                <p className="text-sm font-semibold text-slate-700">{formatCurrency(company.valuation, true)}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Available</p>
                <p className="text-sm font-semibold text-slate-700">{company.availableShares.toLocaleString()} shares</p>
              </div>
            </div>

            {/* Share availability bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Shares sold</span>
                <span>{Math.round(((company.totalShares - company.availableShares) / company.totalShares) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3b5bdb] rounded-full transition-all"
                  style={{ width: `${((company.totalShares - company.availableShares) / company.totalShares) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/company/${company.id}`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">View Details</Button>
              </Link>
              <Button size="sm" className="flex-1" onClick={() => { setBuyModal(company); setQuantity(1); }}>
                Buy Shares
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No companies match your filters</p>
        </div>
      )}

      {/* Buy Modal */}
      <Modal open={!!buyModal} onClose={() => setBuyModal(null)} title={`Buy Shares — ${buyModal?.name}`} size="md">
        {buyModal && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-slate-400">Price per share</p>
                <p className="text-lg font-bold text-slate-900">{formatCurrency(buyModal.pricePerShare)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Available shares</p>
                <p className="text-lg font-bold text-slate-900">{buyModal.availableShares.toLocaleString()}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1.5">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold transition-colors">−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="flex-1 text-center py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold transition-colors">+</button>
              </div>
            </div>

            <div className="bg-[#3b5bdb]/5 border border-[#3b5bdb]/20 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(buyModal.pricePerShare * quantity)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Platform fee (0.5%)</span>
                <span className="font-semibold">{formatCurrency(buyModal.pricePerShare * quantity * 0.005)}</span>
              </div>
              <div className="border-t border-[#3b5bdb]/20 pt-2 flex justify-between">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-bold text-[#3b5bdb]">{formatCurrency(buyModal.pricePerShare * quantity * 1.005)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={() => setBuyModal(null)}>
              Confirm Purchase
            </Button>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
