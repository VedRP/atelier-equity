"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    if (open) {
      // Make visible before animating in
      overlay.style.display = "flex";
      document.body.style.overflow = "hidden";
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" });
      gsap.fromTo(content, { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlay, {
        opacity: 0, duration: 0.15, ease: "power1.in",
        onComplete: () => { if (overlay) overlay.style.display = "none"; }
      });
    }

    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) { onClose(); return; }
    gsap.to(content, { opacity: 0, y: 12, scale: 0.97, duration: 0.15, ease: "power2.in" });
    gsap.to(overlay, { opacity: 0, duration: 0.15, ease: "power1.in", onComplete: onClose });
  };

  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-2xl" };

  // Always render — visibility controlled by GSAP + display style
  return (
    <div
      ref={overlayRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-50 items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className={cn("bg-white rounded-2xl shadow-2xl w-full", sizes[size])}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
