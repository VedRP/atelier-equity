"use client";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAppStore } from "@/lib/store/useAppStore";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className={cn("transition-all duration-300", sidebarOpen ? "ml-56" : "ml-16")}>
        <Navbar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
