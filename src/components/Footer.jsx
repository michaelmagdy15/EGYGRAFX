/* eslint-disable */
import React from "react";

export default function Footer({ setActiveTab }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-brandBorder bg-brandPanel px-6 py-10 md:px-12 mt-12 text-xs font-outfit">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
        
        {/* Logo and Tagline (Left Column) */}
        <div className="md:col-span-4 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
          <button 
            className="w-40 h-auto cursor-pointer select-none bg-transparent border-none p-0 text-left focus:outline-none"
            onClick={() => setActiveTab("portal")}
            aria-label="EGYGRAFX B2B Portal Home"
          >
            <img
              src="/logo/Logo Text Under.png"
              alt="EGYGRAFX."
              className="w-full h-auto object-contain"
              draggable="false"
            />
          </button>
          <p className="text-brandTextSecondary max-w-xs text-[11px] leading-relaxed font-inter">
            Bridging industrial machinery capabilities with verified commercial print applications. A premium serverless matchmaking paradigm for the Egyptian & Middle East printing market.
          </p>
        </div>

        {/* Sitemap Gateway Links (Middle Column) */}
        <div className="md:col-span-4 space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="text-[10px] font-courier uppercase text-brandAccent tracking-widest font-bold">
            Staging Sitemap
          </div>
          <div className="flex flex-wrap md:flex-col gap-x-4 gap-y-2 justify-center md:justify-start text-brandTextSecondary">
            <button onClick={() => setActiveTab("portal")} className="hover:text-brandAccent transition-colors text-left cursor-pointer">
              B2B Solutions Matchmaker
            </button>
            <button onClick={() => setActiveTab("calc")} className="hover:text-brandAccent transition-colors text-left cursor-pointer">
              Operational ROI Modeler
            </button>
            <button onClick={() => setActiveTab("admin")} className="hover:text-brandAccent transition-colors text-left cursor-pointer">
              Headless CMS CRM Desk
            </button>
            <button onClick={() => setActiveTab("deck")} className="hover:text-brandAccent transition-colors text-left cursor-pointer">
              Interactive Corporate Pitch Deck
            </button>
          </div>
        </div>

        {/* Commercial & Contract Summaries (Right Column) */}
        <div className="md:col-span-4 space-y-3 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="text-[10px] font-courier uppercase text-brandAccent tracking-widest font-bold">
            Staged Milestones ($1,450.00 USD)
          </div>
          <ul className="text-brandTextSecondary font-courier text-[10px] space-y-1.5 leading-normal list-none text-left">
            <li className="flex justify-between w-64 md:w-auto gap-4">
              <span>M1: Deposit & Rebrand (60%)</span>
              <span className="text-brandTextPrimary font-bold font-mono">$870.00</span>
            </li>
            <li className="flex justify-between w-64 md:w-auto gap-4">
              <span>M2: Frontend Catalog Hub (20%)</span>
              <span className="text-brandTextPrimary font-bold font-mono">$290.00</span>
            </li>
            <li className="flex justify-between w-64 md:w-auto gap-4">
              <span>M3: Secure Database Sync (10%)</span>
              <span className="text-brandTextPrimary font-bold font-mono">$145.00</span>
            </li>
            <li className="flex justify-between w-64 md:w-auto gap-4">
              <span>M4: Production Handoff (10%)</span>
              <span className="text-brandTextPrimary font-bold font-mono">$145.00</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright & Meta Details */}
      <div className="container mx-auto border-t border-brandBorder/50 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-brandTextMetadata font-courier text-[10px] uppercase tracking-wider text-center sm:text-left">
        <div>
          &copy; {currentYear} EGYGRAFX<span className="text-brandAccent">.</span> All rights reserved.
        </div>
        <div>
          Visuals: Mitry Visuals &bull; Ref: MV-2026-085 &bull; Staging Ver: 2.1
        </div>
      </div>
    </footer>
  );
}
