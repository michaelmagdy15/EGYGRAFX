/* eslint-disable */
import React, { useState } from "react";

export default function Header({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "portal", label: "B2B Portal", icon: "fa-earth-africa" },
    { id: "calc", label: "ROI Calculator", icon: "fa-calculator" },
    { id: "admin", label: "Headless CMS", icon: "fa-lock" },
    { id: "deck", label: "Rebrand Deck", icon: "fa-file-powerpoint" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="no-print border-b border-brandBorder bg-brandPanel/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3.5 flex justify-between items-center gap-4">
      {/* Brand Logo & Side Wordmark */}
      <div className="flex items-center gap-3">
        <button 
          className="h-9 w-44 md:w-48 cursor-pointer select-none flex items-center bg-transparent border-none p-0 text-left focus:outline-none"
          onClick={() => handleTabChange("portal")}
          aria-label="EGYGRAFX B2B Portal Home"
        >
          <img
            src="/logo/Logo Text side.png"
            alt="EGYGRAFX."
            className="w-full h-auto object-contain"
            draggable="false"
          />
        </button>
        <div className="h-5 w-[1px] bg-brandBorder hidden xl:block"></div>
        <div className="text-[10px] uppercase tracking-widest text-brandTextMetadata font-courier hidden xl:block mt-1">
          The Hub for Printing Intelligence
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <nav 
        className="hidden lg:flex bg-brandBg border border-brandBorder rounded-xl p-1 gap-1"
        aria-label="Global Navigation"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={`px-4 py-2 rounded-lg font-outfit text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-brandAccent text-brandBg shadow-[0_4px_15px_rgba(253,107,86,0.25)]"
                  : "text-brandTextSecondary hover:text-brandTextPrimary"
              }`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Status Indicators & Hamburger Toggle */}
      <div className="flex items-center gap-4">
        {/* Tagline */}
        <div className="text-xs font-serifTitle italic text-brandAccent tracking-wider hidden sm:block mt-1">
          YOUR APPLICATIONS &mdash; OUR SOLUTIONS
        </div>

        {/* Dynamic Pulse Staging Indicator */}
        <div className="flex items-center gap-1.5 bg-brandBg border border-brandBorder rounded-full px-3 py-1 text-[10px] font-courier text-brandAccent select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="hidden xs:inline">Staging Sync</span>
        </div>

        {/* Hamburger Burger Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-brandTextSecondary hover:text-brandTextPrimary border border-brandBorder bg-brandBg rounded-xl transition-all cursor-pointer w-10 h-10 flex items-center justify-center"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
        >
          <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-base`}></i>
        </button>
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          role="region"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-brandPanel border-b border-brandBorder shadow-2xl z-40 p-4 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full text-left px-4 py-3 rounded-xl font-outfit text-sm font-semibold transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                    isActive
                      ? "bg-brandAccent text-brandBg shadow-md"
                      : "text-brandTextSecondary hover:bg-brandBg hover:text-brandTextPrimary"
                  }`}
                >
                  <i className={`fa-solid ${tab.icon} w-5 text-center`}></i>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );

}
