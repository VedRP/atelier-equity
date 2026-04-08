"use client";
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, FileText, ExternalLink } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { cn } from "@/lib/utils";

const complianceItems = [
  { label: "Identity Verification (KYC)", status: "Verified", date: "Sep 01, 2023", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Accredited Investor Status", status: "Verified", date: "Sep 01, 2023", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "AML Screening", status: "Verified", date: "Sep 01, 2023", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Annual Compliance Review", status: "Due Nov 30, 2023", date: "Due Nov 30, 2023", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Tax Form W-9", status: "Pending", date: "Action required", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
];

const riskScore = 32; // out of 100, lower = lower risk

export default function CompliancePage() {
  return (
    <DashboardLayout title="Compliance">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status list */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Compliance Status</h3>
            <div className="space-y-3">
              {complianceItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", item.bg)}>
                      <item.icon size={14} className={item.color} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.date}</p>
                    </div>
                  </div>
                  <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", item.bg, item.color)}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Regulatory Documents</h3>
            <div className="space-y-2">
              {[
                { name: "Subscription Agreement", date: "Sep 01, 2023" },
                { name: "Private Placement Memorandum", date: "Sep 01, 2023" },
                { name: "Investor Questionnaire", date: "Sep 01, 2023" },
                { name: "Operating Agreement", date: "Sep 01, 2023" },
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#3b5bdb]/10 rounded-lg flex items-center justify-center">
                      <FileText size={14} className="text-[#3b5bdb]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                      <p className="text-xs text-slate-400">Signed {doc.date}</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {/* Risk meter */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Risk Score</h3>
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-20 overflow-hidden mb-3">
                <div className="absolute inset-0 rounded-t-full border-[12px] border-slate-100" style={{ borderBottomColor: "transparent" }} />
                <div
                  className="absolute inset-0 rounded-t-full border-[12px] border-emerald-400 transition-all duration-1000"
                  style={{
                    borderBottomColor: "transparent",
                    clipPath: `polygon(0 100%, 100% 100%, 100% ${100 - riskScore}%, 0 ${100 - riskScore}%)`,
                    transform: `rotate(${(riskScore / 100) * 180 - 90}deg)`,
                    transformOrigin: "50% 100%",
                  }}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-2xl font-bold text-slate-900">{riskScore}</p>
                  <p className="text-[10px] text-slate-400">/ 100</p>
                </div>
              </div>
              <div className="w-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-400 h-2 rounded-full mb-2" />
              <div className="flex justify-between w-full text-[10px] text-slate-400">
                <span>Low Risk</span>
                <span>High Risk</span>
              </div>
              <div className="mt-3 text-center">
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">Low Risk Profile</span>
              </div>
            </div>
          </div>

          {/* Account status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Account Status</h3>
            <div className="space-y-3">
              {[
                { label: "Account Type", value: "Accredited Investor" },
                { label: "KYC Level", value: "Enhanced Due Diligence" },
                { label: "Investment Limit", value: "$10,000,000" },
                { label: "Member Since", value: "March 2022" },
                { label: "Tier", value: "Gold Member" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
