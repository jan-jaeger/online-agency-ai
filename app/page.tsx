import Hero from "@/components/Hero";
import LiveAnalyzerSection from "@/components/LiveAnalyzerSection";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import FunnelSection from "@/components/FunnelSection";
import ChatDemoSection from "@/components/ChatDemoSection";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <LiveAnalyzerSection />
      <ComparisonMatrix />
      <FunnelSection />
      <ChatDemoSection />
      <FAQ />
    </main>
  );
}
