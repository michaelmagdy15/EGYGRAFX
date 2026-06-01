/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

let proposalCounter = Date.now();
const generateProposalId = () => {
  return `prop_${proposalCounter++}`;
};

export default function PortalView() {
  const { database, activeSectorId, setActiveSectorId, addLead, suppliers } = useApp();

  // Find active sector details
  const activeSector = database.find((s) => s.id === activeSectorId) || database[0];

  // Configurator states
  const [selectedMachineId, setSelectedMachineId] = useState("");
  const [selectedWidth, setSelectedWidth] = useState("");
  const [heads, setHeads] = useState(8);
  const [hours, setHours] = useState(8);

  // Quote form states
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadBudget, setLeadBudget] = useState("$50,000 - $100,000");
  const [leadTimeline, setLeadTimeline] = useState("Immediate");
  const [leadWhatsApp, setLeadWhatsApp] = useState(true);

  // Demo Booking states
  const [demoName, setDemoName] = useState("");
  const [demoCompany, setDemoCompany] = useState("");
  const [demoPhone, setDemoPhone] = useState("");
  const [demoCategory, setDemoCategory] = useState("Dye-Sublimation Calendering");
  const [demoDate, setDemoDate] = useState("");
  const [demoScheduled, setDemoScheduled] = useState(false);

  // Modal proposal booklet states
  const [modalOpen, setModalOpen] = useState(false);
  const [proposalData, setProposalData] = useState(null);

  // Lightbox catalog zoom states
  const [isCatalogZoomed, setIsCatalogZoomed] = useState(false);

  const matchmakerRef = useRef(null);
  const configuratorRef = useRef(null);
  const quoteFormRef = useRef(null);
  const demoBookingRef = useRef(null);

  // Sync selected machine when sector changes
  useEffect(() => {
    if (activeSector && activeSector.hardware.length > 0) {
      const firstMachine = activeSector.hardware[0];
      setSelectedMachineId(firstMachine.id);
      setSelectedWidth(firstMachine.widths[0]);
      setHeads(firstMachine.defaultHeads);
    }
  }, [activeSectorId]);

  // Find selected machine details
  const selectedMachine = activeSector.hardware.find((h) => h.id === selectedMachineId) || activeSector.hardware[0];

  // Sync heads range limits when machine changes
  useEffect(() => {
    if (selectedMachine) {
      setHeads(selectedMachine.defaultHeads);
      if (selectedMachine.widths && selectedMachine.widths.length > 0) {
        setSelectedWidth(selectedMachine.widths[0]);
      }
    }
  }, [selectedMachineId]);

  // Handle escape key to close proposal or catalog modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setIsCatalogZoomed(false);
      }
    };
    if (modalOpen || isCatalogZoomed) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [modalOpen, isCatalogZoomed]);

  if (!activeSector || !selectedMachine) return null;

  // Calculate dynamic slider limits
  const minHeads = Math.max(2, selectedMachine.defaultHeads / 2);
  const maxHeads = selectedMachine.defaultHeads * 2;
  const stepHeads = selectedMachine.defaultHeads >= 8 ? 4 : 2;

  // OUTCOME MATHEMATICAL EQUATIONS
  // Daily Volume sqm = Speed * heads/defaultHeads * hours * 85% efficiency
  const dailyVolume = Math.round(selectedMachine.speed * (heads / selectedMachine.defaultHeads) * hours * 0.85);
  // Ink draw = dailyVolume * 12ml/sqm * ink multiplier
  const inkMultiplier = activeSectorId === "t-shirts" ? 2.1 : activeSectorId === "promotional-spec" ? 1.6 : 1.0;
  const dailyInk = parseFloat((dailyVolume * 0.012 * inkMultiplier).toFixed(1));
  const dailyMedia = dailyVolume;
  const dailyPower = Math.round(selectedMachine.powerDraw * hours);
  
  // Simulated Budget = basePrice + (heads - defaultHeads)/2 * headPairCost
  const headCostPair = selectedMachine.defaultHeads >= 8 ? 7000 : 3500;
  const priceOffset = selectedMachine.defaultHeads > 2 ? ((heads - selectedMachine.defaultHeads) / 2) * headCostPair : 0;
  const estimatedBudget = selectedMachine.basePrice + priceOffset;

  const scrollToSection = (elementRef) => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();

    const proposalObj = {
      id: generateProposalId(),
      clientName: leadName,
      company: leadCompany,
      phone: leadPhone,
      sectorTitle: activeSector.title,
      machineModel: `${selectedMachine.brand} ${selectedMachine.model}`,
      headsCount: heads,
      mediaWidth: `${selectedWidth}m`,
      budgetRange: leadBudget,
      timeline: leadTimeline,
      dailyVolume,
      dailyInk,
      dailyMedia,
      dailyPower,
      estimatedBudget,
      inkSystem: activeSector.ink.name,
      mediaSystem: activeSector.media.name,
      dateString: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    setProposalData(proposalObj);
    addLead({
      company: leadCompany,
      contact: leadName,
      sector: activeSector.title,
      setup: `${selectedMachine.brand} ${selectedMachine.model} (${heads} heads, ${selectedWidth}m)`,
      budget: leadBudget,
      status: "RFQ Sent / PDF Compiled"
    });

    setModalOpen(true);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();

    addLead({
      company: demoCompany,
      contact: demoName,
      sector: "Live Demo Scheduled",
      setup: `${demoCategory} (${demoDate})`,
      budget: "Staging Booking",
      status: "Cairo Demo Scheduled"
    });

    setDemoScheduled(true);
    setTimeout(() => {
      setDemoScheduled(false);
      setDemoName("");
      setDemoCompany("");
      setDemoPhone("");
      setDemoDate("");
    }, 4000);
  };

  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 animate-fade-in text-brandTextSecondary">
      
      {/* ================= HERO SECTION (AluBest Ecosystem Model) ================= */}
      <section className="no-print bg-brandPanel border border-brandBorder rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-10 min-h-[360px]">
        <div className="absolute right-[-60px] top-[-60px] w-64 h-64 rounded-full bg-brandAccent/5 border border-brandAccent/10 pointer-events-none"></div>
        <div className="absolute left-[20%] bottom-[-40px] w-36 h-36 rounded-full bg-brandCrimson/5 border border-brandCrimson/10 pointer-events-none"></div>
        
        <div className="flex-1 flex flex-col gap-4 relative z-10 text-center xl:text-left">
          <div className="flex items-center justify-center xl:justify-start gap-2.5">
            <span className="font-courier text-[10px] uppercase text-brandAccent tracking-widest bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded font-bold">
              EGYGRAFX ECOSYSTEM
            </span>
            <span className="text-[10px] text-brandTextMetadata font-courier hidden sm:inline">MV-2026-085</span>
          </div>
          <h1 className="font-serifTitle italic text-3xl sm:text-4xl md:text-5xl text-brandTextPrimary font-bold leading-tight">
            Anyone can sell you a printer. We build production ecosystems that outperform.
          </h1>
          <p className="text-xs sm:text-sm text-brandTextSecondary max-w-2xl leading-relaxed mx-auto xl:mx-0">
            Welcome to the digital matchmaking paradigm shift for the Egyptian and Middle East printing market. Transitioning traditional offset listings into intent-driven, compatible B2B printing ecosystems matching media rolls, ink chemistries, and calender thermal yields.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center xl:justify-start">
            <button
              onClick={() => scrollToSection(matchmakerRef)}
              className="bg-brandAccent text-brandBg hover:bg-brandAccentHover px-6 py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-widest transition cursor-pointer shadow-md"
            >
              Launch Matchmaker Configurator
            </button>
            <button
              onClick={() => scrollToSection(demoBookingRef)}
              className="bg-brandBg hover:bg-brandBorder border border-brandBorder text-brandTextPrimary px-6 py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-widest transition cursor-pointer"
            >
              Book Cairo Free-Zone Demo
            </button>
          </div>
        </div>
        
        {/* Industry stats counters grid */}
        <div className="shrink-0 w-full xl:w-[320px] grid grid-cols-2 gap-3 z-10 font-outfit">
          <div className="bg-brandBg/60 border border-brandBorder rounded-2xl p-4.5 text-center">
            <div className="text-2xl font-extrabold text-brandAccent font-mono">25+</div>
            <div className="text-[8px] font-courier uppercase text-brandTextMetadata tracking-widest mt-1">Years Experience</div>
          </div>
          <div className="bg-brandBg/60 border border-brandBorder rounded-2xl p-4.5 text-center">
            <div className="text-2xl font-extrabold text-brandAccent font-mono">3,500+</div>
            <div className="text-[8px] font-courier uppercase text-brandTextMetadata tracking-widest mt-1">Active Installs</div>
          </div>
          <div className="bg-brandBg/60 border border-brandBorder rounded-2xl p-4.5 text-center">
            <div className="text-2xl font-extrabold text-brandAccent font-mono">800+</div>
            <div className="text-[8px] font-courier uppercase text-brandTextMetadata tracking-widest mt-1">Clients Helped</div>
          </div>
          <div className="bg-brandBg/60 border border-brandBorder rounded-2xl p-4.5 text-center">
            <div className="text-2xl font-extrabold text-brandAccent font-mono">1</div>
            <div className="text-[8px] font-courier uppercase text-brandTextMetadata tracking-widest mt-1">Cairo Demo Zone</div>
          </div>
        </div>
      </section>

      {/* ================= SUPPLIER DIRECTORY SHOWCASE ================= */}
      <section className="no-print space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-courier text-xs text-brandAccent bg-brandAccent/10 px-2.5 py-1 rounded border border-brandAccent/20 font-bold">01</span>
          <h2 className="text-lg font-bold font-outfit text-brandTextPrimary uppercase tracking-wider">Our Premier Industrial Suppliers</h2>
          <div className="flex-grow h-[1px] bg-brandBorder"></div>
        </div>
        
        <p className="text-xs text-brandTextSecondary max-w-3xl leading-relaxed">
          We represent the world's standard in digital print mechanics and calender transfer systems. Click a supplier card to explore their official specifications database.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-outfit">
          {suppliers.map((sup) => (
            <div
              key={sup.id}
              className="bg-brandPanel border border-brandBorder hover:border-brandAccent/50 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-center border-b border-brandBorder/40 pb-2">
                  <span className="text-[10px] font-courier text-brandAccent bg-brandAccent/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {sup.category}
                  </span>
                  <span className="text-xs font-mono select-none flex items-center gap-1.5" title={sup.origin}>
                    <span>{sup.flag}</span>
                    <span className="text-[9px] uppercase font-courier text-brandTextMetadata">{sup.origin}</span>
                  </span>
                </div>
                <h4 className="text-base font-bold text-brandTextPrimary mt-3 font-outfit transition-colors group-hover:text-brandAccent">
                  {sup.name}
                </h4>
                <p className="text-xs text-brandTextSecondary mt-2 leading-relaxed font-inter">
                  {sup.note}
                </p>
              </div>

              <div className="flex justify-end border-t border-brandBorder/40 pt-3">
                <a
                  href={sup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-courier font-bold uppercase text-brandTextMetadata hover:text-brandAccent transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Visit Supplier Website <i className="fa-solid fa-arrow-up-right-from-square text-[8px]"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DYNAMIC SECTOR MATCHMAKER GRID ================= */}
      <section ref={matchmakerRef} className="no-print space-y-6 scroll-mt-20">
        <div className="flex items-center gap-3">
          <span className="font-courier text-xs text-brandAccent bg-brandAccent/10 px-2.5 py-1 rounded border border-brandAccent/20 font-bold">02</span>
          <h2 className="text-lg font-bold font-outfit text-brandTextPrimary uppercase tracking-wider">Interactive Solutions Matchmaker</h2>
          <div className="flex-grow h-[1px] bg-brandBorder"></div>
        </div>
        
        <p className="text-xs text-brandTextSecondary max-w-3xl leading-relaxed">
          Select Nour's production application below. The system automatically filters compatible supplier printheads, inks, media webs, and calenders in real-time.
        </p>

        {/* 9-Sector Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4">
          {database.map((sector, index) => {
            const isActive = sector.id === activeSectorId;
            
            // Asymmetric grid spanning rules
            let gridSpan = "md:col-span-4";
            if (index === 0) gridSpan = "md:col-span-8 md:row-span-2"; // Sector 1 wide
            if (index === 4) gridSpan = "md:col-span-8"; // Sector 5 wide

            const icons = [
              "fa-layer-group", "fa-shirt", "fa-border-all", 
              "fa-scissors", "fa-image", "fa-brush", 
              "fa-cubes", "fa-box-open", "fa-gift"
            ];

            return (
              <div
                key={sector.id}
                role="button"
                tabIndex={0}
                aria-label={`Select and configure ${sector.title} sector`}
                aria-pressed={isActive}
                onClick={() => {
                  setActiveSectorId(sector.id);
                  scrollToSection(configuratorRef);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveSectorId(sector.id);
                    scrollToSection(configuratorRef);
                  }
                }}
                className={`bg-brandPanel border border-brandBorder rounded-2xl p-5 md:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 bento-card-glow group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brandAccent ${gridSpan} ${
                  isActive ? "bento-card-active" : ""
                }`}
              >
                <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-brandAccent/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-all"></div>
                
                <div className="flex justify-between items-start">
                  <span className={`p-2.5 rounded-xl bg-brandBg border transition-colors ${
                    isActive ? "border-brandAccent text-brandAccent" : "border-brandBorder text-brandTextSecondary group-hover:border-brandAccent group-hover:text-brandAccent"
                  }`}>
                    <i className={`fa-solid ${icons[index] || "fa-print"} text-lg`}></i>
                  </span>
                  <span className={`text-[10px] font-courier ${isActive ? "text-brandAccent" : "text-brandTextMetadata"}`}>
                    {sector.tag}
                  </span>
                </div>
                
                <div className="mt-8 flex flex-col gap-2">
                  <span className={`font-courier text-[9px] font-bold uppercase tracking-wider ${isActive ? "text-brandAccent" : "text-brandTextMetadata"}`}>
                    Application Module
                  </span>
                  <h3 className="font-serifTitle italic text-xl font-bold text-brandTextPrimary transition-colors group-hover:text-brandAccent">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-brandTextSecondary leading-relaxed font-inter">
                    {sector.description}
                  </p>
                </div>
                
                <div className="mt-6 flex justify-between items-center border-t border-brandBorder/40 pt-4">
                  <div className="flex gap-2">
                    <span className="text-[9px] font-mono bg-brandBg px-2 py-1 rounded text-brandTextSecondary border border-brandBorder/60">
                      {sector.hardware[0]?.heads.split(" ")[0]} heads
                    </span>
                    <span className="text-[9px] font-mono bg-brandBg px-2 py-1 rounded text-brandTextSecondary border border-brandBorder/60">
                      {sector.hardware[0]?.speed} sqm/hr
                    </span>
                  </div>
                  <span className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-transform group-hover:translate-x-1.5 ${
                    isActive ? "text-brandAccent" : "text-brandTextSecondary group-hover:text-brandAccent"
                  }`}>
                    Configure Suite <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= PARAMETER CONFIGURATOR ================= */}
      <section ref={configuratorRef} className="no-print scroll-mt-20 space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-courier text-xs text-brandAccent bg-brandAccent/10 px-2.5 py-1 rounded border border-brandAccent/20 font-bold">03</span>
          <h2 className="text-lg font-bold font-outfit text-brandTextPrimary uppercase tracking-wider">Configure Machinery & Consumables Web</h2>
          <div className="flex-grow h-[1px] bg-brandBorder"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hardware & Consumables Display Sheet */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-brandPanel border border-brandBorder rounded-2xl p-6">
              <h4 className="font-serifTitle italic text-lg font-semibold text-brandTextPrimary border-b border-brandBorder pb-3 flex justify-between items-center">
                <span>Matched Machinery Fleet</span>
                <span className="font-mono text-[9px] uppercase tracking-widest bg-brandAccent/15 border border-brandAccent/30 px-2.5 py-0.5 rounded text-brandAccent">
                  {activeSector.title.split(" & ")[0]} Specs
                </span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {activeSector.hardware.map((hw) => {
                  const isSelected = selectedMachineId === hw.id;
                  return (
                    <div
                      key={hw.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${hw.brand} ${hw.model}`}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedMachineId(hw.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedMachineId(hw.id);
                        }
                      }}
                      className={`bg-brandBg border rounded-xl p-5 flex flex-col justify-between gap-4 transition-all duration-300 group/item cursor-pointer focus:outline-none focus:ring-2 focus:ring-brandAccent ${
                        isSelected
                          ? "border-brandAccent bg-brandAccent/5 shadow-md"
                          : "border-brandBorder hover:border-brandAccent/50"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-courier text-brandTextMetadata font-bold uppercase">{hw.brand}</span>
                          <span className="text-[9px] font-courier text-brandTextMetadata bg-brandPanel border border-brandBorder px-2 py-0.5 rounded">{hw.origin}</span>
                        </div>
                        <h5 className={`text-sm font-bold mt-2 font-outfit transition-colors ${
                          isSelected ? "text-brandAccent" : "text-brandTextPrimary group-hover/item:text-brandAccent"
                        }`}>{hw.model}</h5>
                        <p className="text-[10px] text-brandTextSecondary mt-2 leading-relaxed font-inter">{hw.note}</p>
                      </div>
                      
                      <div className="border-t border-brandBorder/45 pt-3 mt-1 space-y-1.5 font-courier text-[10px] text-brandTextSecondary">
                        <div className="flex justify-between"><span>Printheads:</span><span className="text-brandTextPrimary">{hw.heads}</span></div>
                        <div className="flex justify-between"><span>Max Width:</span><span className="text-brandTextPrimary">{hw.maxWidth}</span></div>
                        <div className="flex justify-between"><span>Speed Cap:</span><span className="text-brandAccent font-bold">{hw.speed} sqm/h</span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consumables sync sheets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Compatible Ink */}
              <div className="bg-brandPanel border border-brandBorder rounded-2xl p-5 space-y-3">
                <h5 className="font-serifTitle italic text-sm font-bold text-brandTextPrimary border-b border-brandBorder pb-2 flex gap-2 items-center">
                  <i className="fa-solid fa-droplet text-brandAccent"></i> Certified Ink Chemistry
                </h5>
                <div className="space-y-2 font-courier text-[10px] text-brandTextSecondary">
                  <div className="flex justify-between"><span>Model Name:</span><span className="text-brandTextPrimary font-bold">{activeSector.ink.name}</span></div>
                  <div className="flex justify-between"><span>Brand:</span><span className="text-brandTextPrimary">{activeSector.ink.brand} / {activeSector.ink.origin}</span></div>
                  <div className="flex justify-between"><span>Head Sync:</span><span className="text-brandTextPrimary">{activeSector.ink.headsOptimized}</span></div>
                  <div className="flex justify-between"><span>Packaging:</span><span className="text-brandAccent font-bold">{activeSector.ink.packaging}</span></div>
                  <div className="text-[10px] text-brandTextMetadata font-inter leading-relaxed border-t border-brandBorder/50 pt-2.5 mt-2">
                    {activeSector.ink.properties}
                  </div>
                </div>
              </div>

              {/* Compatible substrate paper */}
              <div className="bg-brandPanel border border-brandBorder rounded-2xl p-5 space-y-3">
                <h5 className="font-serifTitle italic text-sm font-bold text-brandTextPrimary border-b border-brandBorder pb-2 flex gap-2 items-center">
                  <i className="fa-solid fa-scroll text-brandAccent"></i> Substrates & Media rolls
                </h5>
                <div className="space-y-2 font-courier text-[10px] text-brandTextSecondary">
                  <div className="flex justify-between"><span>Media Suite:</span><span className="text-brandTextPrimary font-bold">{activeSector.media.name}</span></div>
                  <div className="flex justify-between"><span>Origin:</span><span className="text-brandTextPrimary">{activeSector.media.brand} / {activeSector.media.origin}</span></div>
                  <div className="flex justify-between"><span>Weight:</span><span className="text-brandTextPrimary">{activeSector.media.weight}</span></div>
                  <div className="flex justify-between"><span>Finishes:</span><span className="text-brandAccent font-bold">{activeSector.media.finishes}</span></div>
                  <div className="text-[10px] text-brandTextMetadata font-inter leading-relaxed border-t border-brandBorder/50 pt-2.5 mt-2">
                    {activeSector.media.properties}
                  </div>
                </div>
              </div>
            </div>

            {/* Authentic Catalog Technical Sheet */}
            {activeSector.image && (
              <div className="bg-brandPanel border border-brandBorder rounded-2xl p-5 print-machinery-hide space-y-4">
                <h5 className="font-serifTitle italic text-sm font-bold text-brandTextPrimary border-b border-brandBorder pb-2 flex justify-between items-center">
                  <span className="flex gap-2 items-center">
                    <i className="fa-solid fa-file-pdf text-brandAccent"></i> Authentic Catalog Technical Sheet
                  </span>
                  <a
                    href={activeSector.image}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-courier text-brandAccent hover:text-brandAccentHover uppercase tracking-widest flex items-center gap-1 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open Page <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </a>
                </h5>
                <p className="text-[10px] text-brandTextSecondary leading-relaxed">
                  Real engineering schematic and specs extracted from the official EGYGRAFX printing solutions handbook:
                </p>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsCatalogZoomed(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setIsCatalogZoomed(true);
                    }
                  }}
                  aria-label="Zoom catalog page"
                  className="relative group/catalog overflow-hidden rounded-xl border border-brandBorder bg-brandBg flex items-center justify-center p-2.5 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-brandAccent"
                >
                  <img
                    src={activeSector.image}
                    alt={`${activeSector.title} Official Technical Sheet`}
                    className="w-full h-auto max-h-[340px] object-contain transition-all duration-500 group-hover/catalog:scale-102"
                  />
                  <div className="absolute inset-0 bg-brandBg/60 opacity-0 group-hover/catalog:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-[10px] font-courier uppercase tracking-widest bg-brandPanel border border-brandBorder px-3 py-1.5 rounded-lg text-brandTextPrimary flex items-center gap-2">
                      <i className="fa-solid fa-magnifying-glass-plus text-brandAccent"></i> Click to Zoom catalog page
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Slider Controllers & Yield Stats */}
          <div className="lg:col-span-5 bg-brandPanel border border-brandBorder rounded-2xl p-6 flex flex-col gap-6">
            <h4 className="font-serifTitle italic text-base font-bold text-brandTextPrimary border-b border-brandBorder pb-2 flex gap-2 items-center">
              <i className="fa-solid fa-sliders text-brandAccent"></i> Parameter Configurator
            </h4>
            
            {/* Machine Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Select Active Machine</label>
              <select
                value={selectedMachineId}
                onChange={(e) => setSelectedMachineId(e.target.value)}
                className="w-full bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary font-outfit focus:outline-none focus:border-brandAccent transition"
              >
                {activeSector.hardware.map((hw) => (
                  <option key={hw.id} value={hw.id}>
                    {hw.brand} {hw.model}
                  </option>
                ))}
              </select>
            </div>

            {/* Width Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Select Production Width</label>
              <select
                value={selectedWidth}
                onChange={(e) => setSelectedWidth(e.target.value)}
                className="w-full bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary font-outfit focus:outline-none focus:border-brandAccent transition"
              >
                {selectedMachine.widths.map((w) => (
                  <option key={w} value={w}>
                    {w} meters
                  </option>
                ))}
              </select>
            </div>

            {/* Heads Upgrades Slider */}
            {selectedMachine.defaultHeads > 0 && stepHeads > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Printheads Array Count</span>
                  <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2 py-0.5 rounded text-brandAccent font-bold font-mono">
                    {heads} Heads
                  </span>
                </div>
                <input
                  type="range"
                  min={minHeads}
                  max={maxHeads}
                  step={stepHeads}
                  value={heads}
                  onChange={(e) => setHeads(parseInt(e.target.value))}
                  aria-label="Printheads Array Count"
                  className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
                />
              </div>
            )}

            {/* Hours Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Daily Production Hours</span>
                <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2 py-0.5 rounded text-brandAccent font-bold font-mono">
                  {hours} Hours
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                aria-label="Daily Production Hours"
                className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
              />
            </div>

            {/* Simulated Yield stats panel */}
            <div className="bg-brandBg border border-brandBorder rounded-xl p-5 space-y-3 text-xs font-outfit">
              <div className="text-[9px] font-courier text-brandAccent border-b border-brandBorder/50 pb-1.5 uppercase font-bold tracking-widest">
                Simulated Output Profile
              </div>
              <div className="flex justify-between">
                <span className="text-brandTextSecondary">Daily Print Volume:</span>
                <span className="text-brandTextPrimary font-bold font-mono">{dailyVolume.toLocaleString()} sqm / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brandTextSecondary">Daily Ink Draw:</span>
                <span className="text-brandTextPrimary font-semibold font-mono">{dailyInk.toLocaleString()} L / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brandTextSecondary">Daily Media Draw:</span>
                <span className="text-brandTextPrimary font-semibold font-mono">{dailyMedia.toLocaleString()} sqm / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brandTextSecondary">Daily Power Draw:</span>
                <span className="text-brandTextPrimary font-semibold font-mono">{dailyPower.toLocaleString()} kW / day</span>
              </div>
              <div className="flex justify-between border-t border-brandBorder/80 pt-3 text-sm">
                <span className="text-brandTextSecondary font-bold">Simulated Suite Cost:</span>
                <span className="text-brandAccent font-serifTitle italic font-bold text-base font-mono">
                  ${estimatedBudget.toLocaleString()} USD
                </span>
              </div>
            </div>

            <button
              onClick={() => scrollToSection(quoteFormRef)}
              className="w-full bg-brandAccent text-brandBg hover:bg-brandAccentHover py-3.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-widest mt-2 transition-all cursor-pointer shadow-md"
            >
              Proceed to proposal booklet
            </button>
          </div>
        </div>
      </section>

      {/* ================= COMPILER INQUIRY FORM ================= */}
      <section ref={quoteFormRef} className="no-print scroll-mt-20 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-courier text-xs text-brandAccent bg-brandAccent/10 px-2.5 py-1 rounded border border-brandAccent/20 font-bold">04</span>
          <h2 className="text-lg font-bold font-outfit text-brandTextPrimary uppercase tracking-wider">Compile Proposal Booklet</h2>
          <div className="flex-grow h-[1px] bg-brandBorder"></div>
        </div>

        <div className="bg-brandPanel border border-brandBorder rounded-2xl p-6 md:p-8">
          <h4 className="font-serifTitle italic text-lg font-bold text-brandTextPrimary text-center mb-2">
            Prequalification RFQ Leads compiler
          </h4>
          <p className="text-xs text-brandTextSecondary text-center max-w-xl mx-auto leading-relaxed mb-6 font-inter">
            Submit Nour's prequalification details. The Firestore staging compiler will instantly generate a branded A4 proposal document inside a styled print-ready modal.
          </p>

          <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-outfit">
            <div className="flex flex-col gap-2">
              <label htmlFor="proposal-lead-name" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Contact Name (Attention)</label>
              <input
                id="proposal-lead-name"
                type="text"
                required
                placeholder="e.g. Nour"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="proposal-lead-company" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Company Name</label>
              <input
                id="proposal-lead-company"
                type="text"
                required
                placeholder="e.g. Cairo Textiles Co."
                value={leadCompany}
                onChange={(e) => setLeadCompany(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="proposal-lead-phone" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">WhatsApp / Phone Number</label>
              <input
                id="proposal-lead-phone"
                type="tel"
                required
                placeholder="e.g. +20 102 345 6789"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="proposal-lead-budget" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Estimated CapEx Budget</label>
              <select
                id="proposal-lead-budget"
                value={leadBudget}
                onChange={(e) => setLeadBudget(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              >
                <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                <option value="Over $250,000">Over $250,000</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="proposal-lead-timeline" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Production Timeline</label>
              <select
                id="proposal-lead-timeline"
                value={leadTimeline}
                onChange={(e) => setLeadTimeline(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              >
                <option value="Immediate">Immediate Delivery</option>
                <option value="30 Days">Within 30 Days</option>
                <option value="60-90 Days">Within 60-90 Days</option>
                <option value="Researching">Research Phase Only</option>
              </select>
            </div>

            <div className="flex items-center gap-2.5 mt-6">
              <input
                type="checkbox"
                id="whatsapp-check"
                checked={leadWhatsApp}
                onChange={(e) => setLeadWhatsApp(e.target.checked)}
                className="w-4.5 h-4.5 rounded accent-brandAccent cursor-pointer"
              />
              <label htmlFor="whatsapp-check" className="text-xs text-brandTextSecondary select-none cursor-pointer">
                Deliver pre-qualified PDF booklet to my WhatsApp
              </label>
            </div>

            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-brandAccent hover:bg-brandAccentHover text-brandBg py-4 rounded-xl font-outfit font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg transition-all"
              >
                Compile proposal booklet
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= COMPETITOR COMPARISON MATRIX ================= */}
      <section className="no-print space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-courier text-xs text-brandAccent bg-brandAccent/10 px-2.5 py-1 rounded border border-brandAccent/20 font-bold">05</span>
          <h2 className="text-lg font-bold font-outfit text-brandTextPrimary uppercase tracking-wider">EGYGRAFX vs. Traditional listing sites</h2>
          <div className="flex-grow h-[1px] bg-brandBorder"></div>
        </div>

        <div className="overflow-x-auto bg-brandPanel border border-brandBorder rounded-2xl p-5">
          <table className="w-full text-xs text-left text-brandTextSecondary font-outfit min-w-[500px]">
            <thead>
              <tr className="text-[9px] uppercase tracking-widest text-brandTextMetadata font-courier border-b border-brandBorder/50 pb-2">
                <th className="p-3 pl-0 font-bold">Capability Feature</th>
                <th className="p-3 font-bold text-brandCrimson">Standard WordPress/Directories</th>
                <th className="p-3 font-bold text-brandAccent text-right">EGYGRAFX serverless ecosystem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brandBorder/35 font-inter text-[11px]">
              <tr className="hover:bg-brandBg/20">
                <td className="p-3 pl-0 font-bold text-brandTextPrimary font-outfit">Consumables Sync Checking</td>
                <td className="p-3 text-brandCrimson">Manual verification required</td>
                <td className="p-3 text-emerald-500 font-bold text-right font-outfit flex justify-end gap-1.5 items-center">
                  <i className="fa-solid fa-circle-check"></i> 100% Verified Compatible Ink/Media Mapped
                </td>
              </tr>
              <tr className="hover:bg-brandBg/20">
                <td className="p-3 pl-0 font-bold text-brandTextPrimary font-outfit">Dynamic outcome yield calculators</td>
                <td className="p-3">None (Static charts only)</td>
                <td className="p-3 text-emerald-500 font-bold text-right font-outfit flex justify-end gap-1.5 items-center">
                  <i className="fa-solid fa-circle-check"></i> Real-time variable hours/heads sliders
                </td>
              </tr>
              <tr className="hover:bg-brandBg/20">
                <td className="p-3 pl-0 font-bold text-brandTextPrimary font-outfit">Cairo Demo Center integration</td>
                <td className="p-3">Plain phone call numbers</td>
                <td className="p-3 text-emerald-500 font-bold text-right font-outfit flex justify-end gap-1.5 items-center">
                  <i className="fa-solid fa-circle-check"></i> Real-time Firestore calendar sync
                </td>
              </tr>
              <tr className="hover:bg-brandBg/20">
                <td className="p-3 pl-0 font-bold text-brandTextPrimary font-outfit">Dynamic cost-sheet modeler</td>
                <td className="p-3">N/A</td>
                <td className="p-3 text-emerald-500 font-bold text-right font-outfit flex justify-end gap-1.5 items-center">
                  <i className="fa-solid fa-circle-check"></i> Multi-currency (EGP, USD, SAR, AED)
                </td>
              </tr>
              <tr className="hover:bg-brandBg/20">
                <td className="p-3 pl-0 font-bold text-brandTextPrimary font-outfit">Staging economic overheads</td>
                <td className="p-3 text-brandCrimson">$30 - $70/mo active hosting</td>
                <td className="p-3 text-emerald-500 font-bold text-right font-outfit flex justify-end gap-1.5 items-center">
                  <i className="fa-solid fa-circle-check"></i> $0.00 / month sandbox free tier lock
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ================= LIVE DEMO CENTER BOOKING PORTAL ================= */}
      <section ref={demoBookingRef} className="no-print scroll-mt-20 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-courier text-xs text-brandAccent bg-brandAccent/10 px-2.5 py-1 rounded border border-brandAccent/20 font-bold">06</span>
          <h2 className="text-lg font-bold font-outfit text-brandTextPrimary uppercase tracking-wider">Book A Live demonstration at Cairo Demo Zone</h2>
          <div className="flex-grow h-[1px] bg-brandBorder"></div>
        </div>

        <div className="bg-brandPanel border border-brandBorder rounded-2xl p-6 md:p-8 relative">
          
          {/* Scheduling Success Overlay */}
          {demoScheduled && (
            <div className="absolute inset-0 bg-brandBg/95 rounded-2xl z-25 flex flex-col justify-center items-center gap-3 text-center p-6 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-xl">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h4 className="font-serifTitle italic text-lg font-bold text-brandTextPrimary">
                Cairo Demo Appointment Registered!
              </h4>
              <p className="text-xs text-brandTextSecondary max-w-sm leading-relaxed font-inter">
                Your appointment has been pushed to the Firestore CRM Leads collection. A staging representative will call your WhatsApp contact to confirm domain gates.
              </p>
            </div>
          )}

          <h4 className="font-serifTitle italic text-lg font-bold text-brandTextPrimary text-center mb-2">
            Cairo Free-Zone Staging demonstration center
          </h4>
          <p className="text-xs text-brandTextSecondary text-center max-w-xl mx-auto leading-relaxed mb-6 font-inter">
            Anyone can sell you a printer. We invite you to book a live, hands-on production session. Test compatible substrate draw weights, printhead ink speeds, and oil calender heating.
          </p>

          <form onSubmit={handleDemoSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-outfit">
            <div className="flex flex-col gap-2">
              <label htmlFor="demo-director-name" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Contact Name (Print Director)</label>
              <input
                id="demo-director-name"
                type="text"
                required
                placeholder="e.g. Eng. Ashraf"
                value={demoName}
                onChange={(e) => setDemoName(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="demo-company-name" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Company Name</label>
              <input
                id="demo-company-name"
                type="text"
                required
                placeholder="e.g. Heliopolis Fabrics Co."
                value={demoCompany}
                onChange={(e) => setDemoCompany(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="demo-whatsapp-phone" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">WhatsApp / Phone</label>
              <input
                id="demo-whatsapp-phone"
                type="tel"
                required
                placeholder="e.g. +20 100 234 5678"
                value={demoPhone}
                onChange={(e) => setDemoPhone(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="demo-category-select" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Demonstration Category</label>
              <select
                id="demo-category-select"
                value={demoCategory}
                onChange={(e) => setDemoCategory(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              >
                <option value="Dye-Sublimation Calendering">Dye-Sublimation Calendering (DGI / Novares)</option>
                <option value="Direct-to-Film Pieces">Direct-to-Film Pieces (PolyPrint / Boyin)</option>
                <option value="Precision Industrial Cutters">Precision Industrial Cutters (GBOS Laser)</option>
                <option value="Water-Based Latex Wallpaper">Water-Based Latex Wallpaper (HP Latex)</option>
                <option value="Industrial UV Billboard">Industrial UV Billboard (JHF R7000)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="demo-target-date" className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Target Date</label>
              <input
                id="demo-target-date"
                type="date"
                required
                value={demoDate}
                onChange={(e) => setDemoDate(e.target.value)}
                className="bg-brandBg border border-brandBorder rounded-xl p-3 text-xs text-brandTextPrimary focus:outline-none focus:border-brandAccent transition"
              />
            </div>

            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-brandAccent hover:bg-brandAccentHover text-brandBg py-4 rounded-xl font-outfit font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg transition-all"
              >
                Confirm demo center schedule
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= PROPOSAL modal booklet ================= */}
      {modalOpen && proposalData && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="proposal-modal-title"
          aria-describedby="proposal-modal-desc"
          className="fixed inset-0 bg-brandBg/95 backdrop-blur-sm z-[100] flex justify-center overflow-y-auto px-4 py-8 select-none print-modal-overlay"
        >
          <div className="bg-white text-black print-container rounded-3xl p-6 md:p-10 w-full max-w-4xl relative h-fit flex flex-col gap-6 shadow-2xl selection:bg-brandAccent selection:text-white">
            
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close Proposal Booklet"
              className="no-print absolute top-6 right-6 text-slate-500 hover:text-black border border-slate-300 hover:border-black rounded-full w-8 h-8 flex items-center justify-center transition-all cursor-pointer font-bold focus:outline-none focus:ring-2 focus:ring-brandAccent"
            >
              &times;
            </button>

            {/* Print Header */}
            <div className="border-b-2 border-brandAccent pb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-extrabold tracking-[0.2em] uppercase font-outfit select-none text-black">
                  EGYGRAFX<span className="text-brandAccent">.</span>
                </div>
                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-courier">
                  YOUR APPLICATIONS &mdash; OUR SOLUTIONS
                </div>
              </div>
              
              <div className="text-center sm:text-right font-courier text-[10px] text-slate-500 space-y-0.5">
                <div>Document ID: {proposalData.id}</div>
                <div>Date: {proposalData.dateString}</div>
                <div className="text-brandAccent font-bold uppercase tracking-wider">PREQUALIFIED STAGING sync</div>
              </div>
            </div>

            {/* Slide Title */}
            <div className="text-center space-y-1.5 mt-2">
              <h2 id="proposal-modal-title" className="font-serifTitle italic text-2xl md:text-3xl font-bold text-slate-900 leading-normal">
                B2B Machinery Configuration Proposal
              </h2>
              <p id="proposal-modal-desc" className="text-[10px] font-courier text-slate-500 uppercase tracking-widest">
                Prepared especially for {proposalData.company}
              </p>
            </div>

            {/* Client Context details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-outfit text-xs text-slate-600 print:bg-transparent print:border-slate-300">
              <div>
                <div className="text-[9px] font-courier text-slate-400 uppercase tracking-wider font-bold">Attention</div>
                <div className="text-slate-900 font-semibold text-sm mt-0.5">{proposalData.clientName}</div>
              </div>
              <div>
                <div className="text-[9px] font-courier text-slate-400 uppercase tracking-wider font-bold">Company</div>
                <div className="text-slate-900 font-semibold text-sm mt-0.5">{proposalData.company}</div>
              </div>
              <div>
                <div className="text-[9px] font-courier text-slate-400 uppercase tracking-wider font-bold">Industry Sector</div>
                <div className="text-brandAccent font-semibold text-sm mt-0.5">{proposalData.sectorTitle}</div>
              </div>
              <div>
                <div className="text-[9px] font-courier text-slate-400 uppercase tracking-wider font-bold">Target Timeline</div>
                <div className="text-slate-900 font-semibold text-sm mt-0.5">{proposalData.timeline}</div>
              </div>
            </div>

            {/* Specs & Yield layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
              {/* Matched Suite */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="font-serifTitle italic text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
                  1. Matched Production Setup
                </h3>
                
                <table className="w-full text-xs font-inter text-slate-700">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Primary Hardware:</td>
                      <td className="text-right text-slate-900">{proposalData.machineModel}</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Array Configuration:</td>
                      <td className="text-right text-slate-900 font-mono">{proposalData.headsCount} Printheads</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Media Width:</td>
                      <td className="text-right text-slate-900 font-mono">{proposalData.mediaWidth}</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Certified Ink Sync:</td>
                      <td className="text-right text-slate-900 font-mono">{proposalData.inkSystem}</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Substrate Paper:</td>
                      <td className="text-right text-slate-900 font-mono">{proposalData.mediaSystem}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Yields */}
              <div className="md:col-span-5 space-y-4">
                <h3 className="font-serifTitle italic text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
                  2. Yield Outcomes Forecast
                </h3>
                
                <table className="w-full text-xs font-inter text-slate-700">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Daily Output Volume:</td>
                      <td className="text-right text-slate-900 font-mono font-bold">{proposalData.dailyVolume.toLocaleString()} sqm</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Daily Ink Curing:</td>
                      <td className="text-right text-slate-900 font-mono">{proposalData.dailyInk.toLocaleString()} L / day</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Substrate Draw:</td>
                      <td className="text-right text-slate-900 font-mono">{proposalData.dailyMedia.toLocaleString()} sqm / day</td>
                    </tr>
                    <tr className="py-2.5 flex justify-between">
                      <td className="font-semibold text-slate-800">Electricity Load:</td>
                      <td className="text-right text-slate-900 font-mono">{proposalData.dailyPower.toLocaleString()} kW / day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial capEx banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left mt-2 print:bg-white print:text-slate-900 print:border print:border-slate-300 print:shadow-none">
              <div className="space-y-1">
                <div className="text-[9px] font-courier text-slate-400 uppercase tracking-widest print:text-slate-500">
                  Comprehensive Suite capEx Budget
                </div>
                <div className="text-xs text-slate-300 font-inter print:text-slate-700">
                  Includes printhead upgrades, shipping, standard installation, and ink chemistry sync
                </div>
              </div>
              <div className="text-brandAccent font-serifTitle italic text-2xl font-bold font-mono">
                ${proposalData.estimatedBudget.toLocaleString()} USD
              </div>
            </div>

            {/* Milestones Staged */}
            <div className="space-y-3 mt-2">
              <h3 className="font-serifTitle italic text-base font-bold text-slate-900 border-b border-slate-200 pb-2">
                3. Payment Milestones Schedule (Staged Handoff)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-courier text-[10px] text-slate-600">
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1 print:bg-transparent print:border-slate-300">
                  <div className="font-bold text-slate-900">60% Phase 1</div>
                  <div>Visual guidelines & Sitemap Sign-off</div>
                  <div className="font-bold text-brandAccent mt-2 font-mono">${(proposalData.estimatedBudget * 0.60).toLocaleString()} USD</div>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1 print:bg-transparent print:border-slate-300">
                  <div className="font-bold text-slate-900">20% Phase 2</div>
                  <div>Hardware configuration & Testing sync</div>
                  <div className="font-bold text-brandAccent mt-2 font-mono">${(proposalData.estimatedBudget * 0.20).toLocaleString()} USD</div>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1 print:bg-transparent print:border-slate-300">
                  <div className="font-bold text-slate-900">10% Phase 3</div>
                  <div>Firestore sync & lead registration</div>
                  <div className="font-bold text-brandAccent mt-2 font-mono">${(proposalData.estimatedBudget * 0.10).toLocaleString()} USD</div>
                </div>
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1 print:bg-transparent print:border-slate-300">
                  <div className="font-bold text-slate-900">10% Phase 4</div>
                  <div>Go-live domain handoff & training</div>
                  <div className="font-bold text-brandAccent mt-2 font-mono">${(proposalData.estimatedBudget * 0.10).toLocaleString()} USD</div>
                </div>
              </div>
            </div>

            {/* Signature sign-offs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-slate-200 pt-8 mt-4 font-courier text-[9px] uppercase tracking-wider text-slate-500">
              <div className="border-t border-dashed border-slate-400 pt-3 text-center sm:text-left space-y-1">
                <div>Prepared by EGYGRAFX Co. Representative</div>
                <div className="h-16"></div>
                <div className="font-bold text-slate-900 text-[10px]">SYSTEMS DELIVERY OFFICER</div>
              </div>
              <div className="border-t border-dashed border-slate-400 pt-3 text-center sm:text-left space-y-1">
                <div>Accepted by {proposalData.company} Representative</div>
                <div className="h-16"></div>
                <div className="font-bold text-slate-900 text-[10px]">AUTHORIZED SIGNATURE</div>
              </div>
            </div>

            {/* Actions */}
            <div className="no-print flex justify-end gap-3 mt-4 border-t border-slate-100 pt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-5 py-2.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Close View
              </button>
              <button
                onClick={triggerPrint}
                className="bg-brandAccent text-white hover:bg-brandAccentHover px-6 py-2.5 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider cursor-pointer shadow flex items-center gap-2"
              >
                <i className="fa-solid fa-print"></i> Print Proposal Document
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Lightbox zoom modal for catalog page */}
      {isCatalogZoomed && (
        <div
          className="fixed inset-0 bg-brandBg/95 backdrop-blur-md z-[9999] flex flex-col items-center justify-center p-4 transition-all duration-300 animate-fade-in cursor-zoom-out"
          onClick={() => setIsCatalogZoomed(false)}
        >
          <div className="absolute top-4 right-4 flex gap-4">
            <a
              href={activeSector.image}
              target="_blank"
              rel="noreferrer"
              className="bg-brandPanel hover:bg-brandBorder border border-brandBorder text-brandTextPrimary p-3 rounded-full transition flex items-center justify-center cursor-pointer"
              title="Open Image in New Tab"
              onClick={(e) => e.stopPropagation()}
            >
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button
              onClick={() => setIsCatalogZoomed(false)}
              className="bg-brandAccent hover:bg-brandAccentHover text-brandBg p-3 rounded-full transition flex items-center justify-center cursor-pointer"
              title="Close Zoom"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
          <div className="max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeSector.image}
              alt={`${activeSector.title} Full Technical Sheet`}
              className="max-w-full max-h-full object-contain rounded-lg border border-brandBorder shadow-2xl transition-transform duration-300"
            />
          </div>
          <div className="mt-4 text-center">
            <h5 className="font-serifTitle italic text-brandTextPrimary text-base">{activeSector.title}</h5>
            <p className="text-xs text-brandTextSecondary font-courier mt-1">Official EGYGRAFX Technical Catalog Sheet (Page {activeSector.image.match(/page_(\d+)/)?.[1]})</p>
          </div>
        </div>
      )}

    </div>
  );
}
