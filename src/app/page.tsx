import Image from "next/image";
import HeroSection from "./components/hero-section";
import WhyBlockchainSection from "./components/why-blockchain-section";
import ManageTransactionsSection from "./components/manage-transactions-section";
import ServiceSelectionGrid from "./components/service-selection-grid";

export default function Home() {
  return (
    <>
    <HeroSection/>
    <WhyBlockchainSection />
    <ManageTransactionsSection />
    <ServiceSelectionGrid />
    </>
  );
}
