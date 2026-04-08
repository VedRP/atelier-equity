"use client";
import { useState } from "react";
import { User, Lock, Bell, Shield, Camera } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { mockUser } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Profile & Settings">
      <div className="max-w-3xl">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeTab === id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {activeTab === "profile" && (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Profile Photo</h3>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#3b5bdb] flex items-center justify-center text-white text-xl font-bold">MV</div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors">
                    <Camera size={10} className="text-slate-500" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{mockUser.name}</p>
                  <p className="text-xs text-slate-400">{mockUser.email}</p>
                  <span className="inline-block mt-1 text-[10px] bg-[#3b5bdb]/10 text-[#3b5bdb] px-2 py-0.5 rounded-full font-medium">{mockUser.tier} Member</span>
                </div>
              </div>
            </div>

            {/* Personal info */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" defaultValue="Marcus" />
                <Input label="Last Name" defaultValue="Vane" />
                <Input label="Email" type="email" defaultValue={mockUser.email} className="col-span-2" />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                <Input label="Country" defaultValue="United States" />
              </div>
              <Button className="mt-4" onClick={handleSave} loading={false}>
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </div>

            {/* KYC Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">KYC Status</h3>
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <Shield size={20} className="text-emerald-600" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Identity Verified</p>
                  <p className="text-xs text-emerald-600">Your account is fully verified. Enhanced Due Diligence completed.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="Min. 8 characters" />
                <Input label="Confirm New Password" type="password" placeholder="Repeat new password" />
                <Button>Update Password</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-slate-800">Authenticator App</p>
                  <p className="text-xs text-slate-400">Use Google Authenticator or similar</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">Enabled</span>
                  <Button variant="secondary" size="sm">Manage</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: "Capital Call Notices", desc: "Get notified when a capital call is issued", enabled: true },
                { label: "Distribution Alerts", desc: "Receive alerts when distributions are processed", enabled: true },
                { label: "New Investment Opportunities", desc: "Be the first to know about new listings", enabled: true },
                { label: "Portfolio Updates", desc: "Weekly portfolio performance summary", enabled: false },
                { label: "Compliance Reminders", desc: "Reminders for upcoming compliance deadlines", enabled: true },
                { label: "Marketing Emails", desc: "Platform news and feature updates", enabled: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:bg-[#3b5bdb] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
                  </label>
                </div>
              ))}
            </div>
            <Button className="mt-4">Save Preferences</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
