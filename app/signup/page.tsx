"use client";
import { useEffect, useRef, useState } from "react";
import { BarChart3, ArrowRight, ArrowLeft, Check, Upload, User, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const steps = ["Account", "Role", "KYC", "Verify"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"Investor" | "Seller" | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [step]);

  const next = async () => {
    if (step === steps.length - 1) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1200));
      router.push("/dashboard");
      return;
    }
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3b5bdb]/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#3b5bdb] rounded-2xl mb-4 shadow-lg">
            <BarChart3 size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-500 mt-1">Join the Atelier Equity platform</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-1.5 rounded-full transition-all duration-300 ${i <= step ? "bg-[#3b5bdb]" : "bg-slate-200"}`} />
              <span className={`text-[10px] font-medium ${i <= step ? "text-[#3b5bdb]" : "text-slate-400"}`}>{s}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <div ref={contentRef}>
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Your details</h2>
                <Input label="Full Name" placeholder="Marcus Vane" required />
                <Input label="Email address" type="email" placeholder="you@example.com" required />
                <Input label="Password" type="password" placeholder="Min. 8 characters" required />
                <Input label="Confirm Password" type="password" placeholder="Repeat password" required />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">Select your role</h2>
                <p className="text-sm text-slate-500">How will you use the platform?</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {(["Investor", "Seller"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        role === r ? "border-[#3b5bdb] bg-[#3b5bdb]/5" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${role === r ? "bg-[#3b5bdb]" : "bg-slate-100"}`}>
                        {r === "Investor" ? <User size={18} className={role === r ? "text-white" : "text-slate-500"} /> : <Building2 size={18} className={role === r ? "text-white" : "text-slate-500"} />}
                      </div>
                      <p className="font-semibold text-slate-900 text-sm">{r}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r === "Investor" ? "Browse & invest in deals" : "List & sell equity"}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900">KYC Verification</h2>
                <p className="text-sm text-slate-500">Upload a government-issued ID to verify your identity.</p>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                    dragOver ? "border-[#3b5bdb] bg-[#3b5bdb]/5" : uploadedFile ? "border-emerald-400 bg-emerald-50" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {uploadedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check size={20} className="text-emerald-600" />
                      </div>
                      <p className="text-sm font-medium text-emerald-700">{uploadedFile}</p>
                      <p className="text-xs text-emerald-500">File uploaded successfully</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <Upload size={20} className="text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">Drag & drop your ID here</p>
                      <p className="text-xs text-slate-400">or click to browse · PDF, JPG, PNG</p>
                    </div>
                  )}
                </div>
                <Input label="PAN / SSN (last 4 digits)" placeholder="XXXX" />
                <Input label="Date of Birth" type="date" />
              </div>
            )}

            {step === 3 && (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Check size={32} className="text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">You&apos;re all set!</h2>
                <p className="text-sm text-slate-500">Your account has been created. KYC verification is under review and typically takes 1-2 business days.</p>
                <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Role</span>
                    <span className="font-medium text-slate-800">{role || "Investor"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">KYC Status</span>
                    <span className="font-medium text-amber-600">Under Review</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <Button variant="secondary" onClick={back} className="flex-1">
                <ArrowLeft size={16} /> Back
              </Button>
            )}
            <Button onClick={next} loading={loading} className="flex-1" disabled={step === 1 && !role}>
              {step === steps.length - 1 ? "Go to Dashboard" : "Continue"} <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#3b5bdb] font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
