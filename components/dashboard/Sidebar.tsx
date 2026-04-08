"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Store, Wallet, PieChart, ShieldCheck, Settings, ChevronLeft, ChevronRight, TrendingDown, Users, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/useAppStore";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/portfolio", label: "Portfolio", icon: PieChart },
  { href: "/sell", label: "Sell Shares", icon: TrendingDown },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/admin", label: "Admin", icon: Users },
  { href: "/profile", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, user } = useAppStore();

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-slate-200 z-30 flex flex-col transition-all duration-300",
      sidebarOpen ? "w-56" : "w-16"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-[#3b5bdb] flex items-center justify-center flex-shrink-0">
          <BarChart3 size={16} className="text-white" />
        </div>
        {sidebarOpen && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 leading-tight">The Atelier</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Private Equity Group</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                active
                  ? "bg-[#3b5bdb]/10 text-[#3b5bdb]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      {sidebarOpen && user && (
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#3b5bdb] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              MV
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{user.tier} Member</p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors z-10"
      >
        {sidebarOpen ? <ChevronLeft size={12} className="text-slate-500" /> : <ChevronRight size={12} className="text-slate-500" />}
      </button>
    </aside>
  );
}
