import { useNavigate } from "react-router-dom";
import { CTASection } from "./cta-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { HistorySection } from "./history-section";
import { HowItWorksSection } from "./how-it-work-section";
import { ProblemSection } from "./problem-section";
import { SharingSection } from "./sharing-section";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="box-border min-h-screen overflow-x-hidden bg-zinc-950 font-sans text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/6 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-sm font-bold tracking-[-0.3px] text-white">
            vem<span className="text-emerald-400">ProFut</span>
          </span>

          <button
            className="rounded-lg border border-white/8 bg-white/5 px-3.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/8 hover:text-white"
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>
        </div>
      </header>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <HistorySection />
      <SharingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
