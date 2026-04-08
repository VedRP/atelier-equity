"use client";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, BarChart3, ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("marcus@atelierequity.com");
  const [password, setPassword] = useState("password123");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      tl.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3b5bdb]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div ref={logoRef} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#3b5bdb] rounded-2xl mb-4 shadow-lg">
            <BarChart3 size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">The Atelier</h1>
          <p className="text-sm text-slate-500 mt-1">Private Equity Group</p>
        </div>

        {/* Form */}
        <div ref={formRef} className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-6">Sign in to your investor account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              icon={<Mail size={14} />}
              required
            />
            <Input
              label="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={<Lock size={14} />}
              suffix={
                <button type="button" onClick={() => setShowPass(!showPass)} className="hover:text-slate-600 transition-colors">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#3b5bdb] focus:ring-[#3b5bdb]" defaultChecked />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#3b5bdb] hover:underline font-medium">Forgot password?</a>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-2">
              Sign In <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#3b5bdb] font-medium hover:underline">Create account</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Atelier Equity Terminal v4.2.1 · Regulated by SEC
        </p>
      </div>
    </div>
  );
}
