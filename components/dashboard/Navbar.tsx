"use client";
import { useState } from "react";
import { Bell, Search, User, ChevronDown, Check } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn, timeAgo } from "@/lib/utils";
import Link from "next/link";

export default function Navbar({ title }: { title?: string }) {
  const { notifications, markNotificationRead } = useAppStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const notifColors = {
    info: "bg-blue-100 text-blue-600",
    success: "bg-emerald-100 text-emerald-600",
    warning: "bg-amber-100 text-amber-600",
    error: "bg-red-100 text-red-600",
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {title && <h1 className="text-base font-semibold text-slate-900">{title}</h1>}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search companies, transactions..."
            className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]/20 focus:border-[#3b5bdb] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#3b5bdb] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Notifications</p>
                <span className="text-xs text-[#3b5bdb] font-medium">{unread} unread</span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={cn("px-4 py-3 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors", !n.read && "bg-blue-50/40")}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs", notifColors[n.type])}>
                        {n.type === "success" ? <Check size={12} /> : <Bell size={12} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{timeAgo(n.createdAt)}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-[#3b5bdb] rounded-full flex-shrink-0 mt-1.5" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#3b5bdb] flex items-center justify-center text-white text-xs font-bold">MV</div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900">Marcus Vane</p>
                <p className="text-xs text-slate-400">Principal Investor</p>
              </div>
              <div className="py-1">
                <Link href="/profile" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Profile</Link>
                <Link href="/admin" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">Admin Panel</Link>
                <Link href="/login" className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">Sign Out</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
