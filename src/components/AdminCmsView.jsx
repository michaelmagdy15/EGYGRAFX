/* eslint-disable */
import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AdminCmsView() {
  const { leads, database, securityLogs, addSecurityLog, updateEquipmentPrice } = useApp();

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");

  // Fleet editor states
  const [selectedEditMachineId, setSelectedEditMachineId] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedModel, setEditedModel] = useState("");

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === "egygrafx2026") {
      setIsAuthenticated(true);
      addSecurityLog("Mock Clerk Access Granted: Session Authenticated.");
    } else {
      alert("Invalid staff passcode. Access denied.");
      addSecurityLog("Clerk Access Denied: Unauthorized authentication attempt.");
    }
  };

  // Find all machines flatly across sectors
  const allMachines = database.flatMap((sector) =>
    sector.hardware.map((hw) => ({ ...hw, sectorTitle: sector.title }))
  );

  const handleMachineSelectChange = (hwId) => {
    setSelectedEditMachineId(hwId);
    const selected = allMachines.find((m) => m.id === hwId);
    if (selected) {
      setEditedModel(selected.model);
      setEditedPrice(selected.basePrice);
    }
  };

  const handlePriceUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedEditMachineId) return;

    updateEquipmentPrice(selectedEditMachineId, editedPrice);
    addSecurityLog(`Firestore fleet record updated: ${selectedEditMachineId} set to $${editedPrice} USD`);
    
    // Simulate dynamic pushing success notification
    const overlay = document.getElementById("pushing-overlay");
    if (overlay) {
      overlay.classList.remove("hidden");
      overlay.classList.add("flex");
      setTimeout(() => {
        overlay.classList.remove("flex");
        overlay.classList.add("hidden");
      }, 1000);
    }
  };

  // Default select first machine if editor mounts
  React.useEffect(() => {
    if (allMachines.length > 0 && !selectedEditMachineId) {
      handleMachineSelectChange(allMachines[0].id);
    }
  }, [selectedEditMachineId]);

  const activeEditMachine = allMachines.find((m) => m.id === selectedEditMachineId) || allMachines[0];

  // Auth lock screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto bg-brandPanel border border-brandBorder rounded-2xl p-6 md:p-8 mt-12 space-y-6 text-center animate-fade-in font-outfit">
        <div className="w-16 h-16 bg-brandAccent/10 border border-brandAccent/20 rounded-full flex items-center justify-center mx-auto text-brandAccent">
          <i className="fa-solid fa-lock text-2xl"></i>
        </div>
        <h2 className="font-serifTitle italic text-xl font-bold text-brandTextPrimary">
          Headless CMS CRM Desk Secure Lock
        </h2>
        <p className="text-xs text-brandTextSecondary leading-relaxed">
          This staging dashboard simulates EGYGRAFX NoSQL Firestore catalog specs editing and real-time pre-qualified leads tracking. Enter staff password to unlock:
        </p>
        
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter passcode (egygrafx2026)"
            aria-label="Staff passcode"
            required
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="w-full bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-center text-brandTextPrimary tracking-widest focus:outline-none focus:border-brandAccent transition"
          />
          <button
            type="submit"
            className="w-full bg-brandAccent hover:bg-brandAccentHover text-brandBg font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer shadow-md"
          >
            Authenticate Session
          </button>
        </form>
        <div className="text-[9px] font-courier text-brandTextMetadata uppercase tracking-wider">
          Secured Mock Sandbox Access Point
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Intro banner */}
      <div className="bg-brandPanel border border-brandBorder rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-courier text-[10px] uppercase text-brandAccent tracking-widest bg-brandAccent/10 border border-brandAccent/20 px-2 py-0.5 rounded">CMS backend</span>
            <span className="text-[10px] text-brandTextMetadata font-courier">MAPPED FOR ASHRAF</span>
          </div>
          <h1 className="font-serifTitle italic text-2xl md:text-3xl font-bold text-brandTextPrimary">Headless Firestore CMS CRM Desk</h1>
          <p className="text-xs text-brandTextSecondary max-w-xl leading-relaxed font-inter">
            Monitor real-time pre-qualified customer leads submitted from the B2B frontend portal, modify fleet machinery catalogs, and audit secure event terminals.
          </p>
        </div>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            setPasscode("");
            addSecurityLog("Clerk Access Revoked: Session Logged Out.");
          }}
          className="bg-brandBg hover:bg-brandBorder border border-brandBorder text-brandTextSecondary hover:text-brandTextPrimary px-4 py-2 rounded-xl text-xs uppercase font-outfit font-bold tracking-wider transition cursor-pointer"
        >
          Logout Session
        </button>
      </div>

      {/* Main Grid split: CRM list vs Specs Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CRM Leads Stream (Left Column) */}
        <div className="lg:col-span-7 bg-brandPanel border border-brandBorder rounded-2xl p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-brandBorder pb-3">
            <h2 className="font-serifTitle italic text-base font-bold text-brandTextPrimary flex gap-2 items-center">
              <i className="fa-solid fa-list text-brandAccent"></i> Firestore Lead Registry (/leads)
            </h2>
            <span className="text-[9px] font-mono uppercase tracking-widest bg-brandAccent/15 border border-brandAccent/30 px-2.5 py-0.5 rounded text-brandAccent select-none">
              CRM Active
            </span>
          </div>

          {/* Leads table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-xs text-left text-brandTextSecondary font-outfit min-w-[500px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-widest text-brandTextMetadata font-courier border-b border-brandBorder/80">
                  <th className="p-3 pl-0 font-bold">Client Contact</th>
                  <th className="p-3 font-bold">Matched Sector</th>
                  <th className="p-3 font-bold">Configuration Setup</th>
                  <th className="p-3 pr-0 text-right font-bold">CRM Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brandBorder/40">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect lead for ${lead.contact} from ${lead.company}`}
                    onClick={() => {
                      addSecurityLog(`Lead inspected: ${lead.company} (${lead.contact})`);
                      alert(
                        `Pre-Qualified Lead Details:\n\nContact: ${lead.contact}\nCompany: ${lead.company}\nSector: ${lead.sector}\nSetup: ${lead.setup}\nBudget: ${lead.budget}\nStaging Status: ${lead.status}`
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        addSecurityLog(`Lead inspected: ${lead.company} (${lead.contact})`);
                        alert(
                          `Pre-Qualified Lead Details:\n\nContact: ${lead.contact}\nCompany: ${lead.company}\nSector: ${lead.sector}\nSetup: ${lead.setup}\nBudget: ${lead.budget}\nStaging Status: ${lead.status}`
                        );
                      }
                    }}
                    className="hover:bg-brandBg/40 transition cursor-pointer focus:bg-brandBg/60 focus:outline-none"
                  >
                    <td className="p-3 pl-0">
                      <div className="font-semibold text-brandTextPrimary">{lead.contact}</div>
                      <div className="text-[10px] text-brandTextMetadata font-courier">{lead.company}</div>
                    </td>
                    <td className="p-3">
                      <span className="bg-brandAccent/10 text-brandAccent text-[9px] px-2 py-0.5 rounded border border-brandAccent/20 font-medium font-mono">
                        {lead.sector.split(" & ")[0]}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="text-brandTextPrimary font-medium">{lead.setup}</div>
                      <div className="text-[10px] text-brandTextMetadata">Inquired Target</div>
                    </td>
                    <td className="p-3 pr-0 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-mono text-[10px]">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          lead.status.includes("Sync") ? "bg-emerald-500 animate-pulse" : "bg-emerald-500"
                        }`}></span>
                        <span className="text-brandTextPrimary font-medium">{lead.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Specs Catalog Editor (Right Column) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brandPanel border border-brandBorder rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-brandBorder pb-2">
              <h2 className="font-serifTitle italic text-base font-bold text-brandTextPrimary flex gap-2 items-center">
                <i className="fa-solid fa-pen-to-square text-brandAccent"></i> Catalog specs modifier
              </h2>
            </div>

            <form onSubmit={handlePriceUpdateSubmit} className="space-y-4 font-outfit">
              {/* Select Machine */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fleet-printer-select" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Select Fleet Printer</label>
                <select
                  id="fleet-printer-select"
                  value={selectedEditMachineId}
                  onChange={(e) => handleMachineSelectChange(e.target.value)}
                  className="w-full bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
                >
                  {allMachines.map((hw) => (
                    <option key={hw.id} value={hw.id}>
                      {hw.brand} {hw.model} ({hw.origin.split(" / ")[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Edit Model Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="model-name-input" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Update Model Name</label>
                <input
                  id="model-name-input"
                  type="text"
                  value={editedModel}
                  onChange={(e) => setEditedModel(e.target.value)}
                  className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
                />
              </div>

              {/* Edit Price */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="base-price-input" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Base Price Tiers (USD)</label>
                <input
                  id="base-price-input"
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary font-mono focus:outline-none focus:border-brandAccent transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brandAccent hover:bg-brandAccentHover text-brandBg font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition cursor-pointer shadow-md mt-2"
              >
                Push changes to staging
              </button>
            </form>

            {/* Google SEO Preview Card */}
            {activeEditMachine && (
              <div className="bg-brandBg border border-brandBorder rounded-xl p-5 space-y-2 mt-2">
                <div className="text-[8px] font-courier text-brandTextMetadata uppercase tracking-widest border-b border-brandBorder/50 pb-1.5 font-bold">
                  Programmatic SEO Google search Preview
                </div>
                <div className="space-y-1 text-left font-serif leading-tight">
                  <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                    <span>https://egygrafx.com</span>
                    <i className="fa-solid fa-angle-right text-[8px]"></i>
                    <span>products</span>
                    <i className="fa-solid fa-angle-right text-[8px]"></i>
                    <span>{activeEditMachine.brand.toLowerCase()}-{activeEditMachine.id}</span>
                  </div>
                  <h5 className="text-sm font-bold text-sky-400 hover:underline cursor-pointer font-sans leading-snug">
                    {activeEditMachine.brand} {editedModel || activeEditMachine.model} specs & matching applications | EGYGRAFX.
                  </h5>
                  <p className="text-[11px] text-brandTextSecondary font-sans leading-relaxed mt-1">
                    Explore matches for the {activeEditMachine.brand} {editedModel || activeEditMachine.model} starting from <span className="font-bold text-white font-mono">${parseFloat(editedPrice || activeEditMachine.basePrice).toLocaleString()} USD</span>. Compatible with {activeEditMachine.inkSystem} on {activeEditMachine.mediaSystem}...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Terminal log panel */}
      <div className="bg-brandPanel border border-brandBorder rounded-2xl p-5 space-y-3 font-courier text-xs relative overflow-hidden">
        
        {/* Dynamic Database pushing overlay simulator */}
        <div id="pushing-overlay" className="hidden absolute inset-0 bg-brandBg/90 backdrop-blur-sm z-30 flex-col justify-center items-center gap-3">
          <div className="flex items-center gap-2 text-brandAccent text-sm font-bold uppercase tracking-widest">
            <span className="w-2.5 h-2.5 rounded-full bg-brandAccent animate-ping"></span>
            <span>Pushing Specs to staging...</span>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-brandBorder pb-2">
          <div className="flex items-center gap-2 text-brandTextPrimary font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Running Console diagnostic logs</span>
          </div>
          <span className="text-[9px] text-brandTextMetadata uppercase tracking-widest font-bold">
            Audit Stream
          </span>
        </div>
        
        <div className="h-32 overflow-y-auto space-y-1.5 text-[10px] text-brandTextSecondary scrollbar-thin select-text">
          {securityLogs.map((log, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-brandTextMetadata">[{log.timestamp}]</span>
              <span className={log.message.includes("Denied") ? "text-brandCrimson" : "text-brandTextPrimary"}>
                &gt; {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
