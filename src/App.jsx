/* eslint-disable */
import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PortalView from "./components/PortalView";
import RoiCalculatorView from "./components/RoiCalculatorView";
import AdminCmsView from "./components/AdminCmsView";
import PresentationView from "./components/PresentationView";

function MainAppContent() {
  const { activeTab, setActiveTab } = useApp();
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Dynamic dynamic SEO metadata engine
  useEffect(() => {
    const seoData = {
      portal: {
        title: "EGYGRAFX B2B Printing Matchmaker | Industrial Large Format Solutions",
        description: "Explore Egypt's leading B2B printing matchmaking ecosystem. Compatible dye-sublimation calenders, HP latex printers, UV flatbeds, media webs, and ink certified chemistries."
      },
      calc: {
        title: "EGYGRAFX Industrial Printing ROI Payback Modeler",
        description: "Calculate your operational printing direct costs, ink fluid draws, gross profit margins, and equipment CapEx return timelines dynamically across EGP, USD, and SAR."
      },
      admin: {
        title: "Headless Firestore CMS CRM Desk | EGYGRAFX Admin Staging",
        description: "Secure real-time administrator command console for EGYGRAFX. Manage live machinery prices, review B2B qualified RFQ lead pipelines, and inspect Firestore system logs."
      },
      deck: {
        title: "EGYGRAFX B2B Corporate Pitch Deck & Proposal",
        description: "Review the formal B2B proposal presentation deck for EGYGRAFX. Discover the digital matchmaking paradigm shift for the Middle East printing marketplace."
      }
    };

    const currentSeo = seoData[activeTab] || seoData.portal;
    
    // Update Document Title
    document.title = currentSeo.title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", currentSeo.description);

    // Update Open Graph (Facebook/LinkedIn) metadata
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", currentSeo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", currentSeo.description);

    // Update Twitter metadata
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", currentSeo.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", currentSeo.description);

  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-brandAccent selection:text-brandBg antialiased">
      {/* Dynamic Staged Animated Preloader */}
      {!preloaderDone && <Preloader onLoaded={() => setPreloaderDone(true)} />}

      {preloaderDone && (
        <div className="flex flex-col min-h-screen justify-between animate-fade-in">
          {/* Accessible Skip to Content Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brandAccent text-brandBg px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs z-[100] border border-brandBorder shadow-lg font-outfit"
          >
            Skip to main content
          </a>

          {/* Top Sticky Rebrand Header */}
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Main Staging Tab Viewport */}
          <main
            id="main-content"
            className="flex-grow container mx-auto px-4 md:px-8 py-8 max-w-7xl"
          >
            {activeTab === "portal" && <PortalView />}
            {activeTab === "calc" && <RoiCalculatorView />}
            {activeTab === "admin" && <AdminCmsView />}
            {activeTab === "deck" && <PresentationView />}
          </main>

          {/* Footer Component */}
          <Footer setActiveTab={setActiveTab} />
        </div>
      )}
    </div>
  );

}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
