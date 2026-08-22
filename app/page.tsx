import Hero from "@/components/Hero";
import LocationsMap from "@/components/LocationsMap";
import LiveAnalyzerSection from "@/components/LiveAnalyzerSection";
import ComparisonMatrix from "@/components/ComparisonMatrix";
import RoiCalculator from "@/components/RoiCalculator";
import CompetitorCompare from "@/components/CompetitorCompare";
import FunnelSection from "@/components/FunnelSection";
import ChatDemoSection from "@/components/ChatDemoSection";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <LiveAnalyzerSection />
      <ComparisonMatrix />
      <RoiCalculator />
      <CompetitorCompare />
      <FunnelSection />
      <LocationsMap />
      <ChatDemoSection />
      <FAQ />
    </main>
  );
}
