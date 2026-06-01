import { useState, useEffect, useCallback } from "react";

export default function PresentationView() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    {
      title: "1. EGYGRAFX Rebrand & Growth Strategy",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Matching Your 30 Years of Market Leadership with a Digital Showroom</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            We are shifting the online portal from a legacy catalog directory into a focused business tool. Our main strategy is built on a clear concept: <strong>YOUR APPLICATIONS ↔ OUR SOLUTIONS</strong>.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div class="bg-brandBg/60 border border-brandBorder p-5 rounded-xl text-left">
              <span class="font-courier text-[10px] text-brandCrimson block mb-2 uppercase font-bold">The Legacy System</span>
              <ul class="list-disc pl-4 space-y-1 text-[11px]">
                <li>Disorganized products listed together</li>
                <li>Overwhelming technical charts for buyers</li>
                <li>Manual search for matching inks/paper</li>
                <li>Potential buyers leave out of confusion</li>
              </ul>
            </div>
            <div class="bg-brandBg/60 border border-brandAccent/20 p-5 rounded-xl text-left">
              <span class="font-courier text-[10px] text-brandAccent block mb-2 uppercase font-bold">The New Strategy</span>
              <ul class="list-disc pl-4 space-y-1 text-[11px] text-brandTextPrimary">
                <li>Intent-driven, organized gateways</li>
                <li>Clean, typographic rebranding</li>
                <li>Synchronized hardware, inks, and paper</li>
                <li>Prequalified sales leads sent instantly</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "2. The Core Concept: The Digital Showroom",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Replacing a Cluttered Warehouse with a Welcoming Showroom</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            Instead of dumping all printers, spare rollers, and chemical inks in a single pile, the new website guides the customer directly to what they need.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-left font-outfit text-xs">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">1. The Greeting</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">The website greets visitors by asking what they want to produce (Home textiles, Signage, or Apparel).</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">2. Dedicated Rooms</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Selecting an industry takes them to a custom room displaying only the machinery built for their specific business.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">3. Complete Packages</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">The matching printer, inks, and paper rolls are shown side-by-side as a single complete package. No guessing required.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "3. Nour's Journey: How We Capture Customers",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">A Simple 3-Click B2B Buyer Journey</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            Consider the real-world story of a B2B customer—<strong>Nour</strong>, a textile factory owner in Al-Mahalla:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-2 text-center text-[10px] font-outfit">
            <div class="bg-brandBg/60 border border-brandBorder p-3 rounded-xl space-y-1">
              <div class="text-brandAccent font-bold">1. LAND</div>
              <p class="text-brandTextSecondary leading-snug text-[9px]">Nour opens the EGYGRAFX site on her mobile screen.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3 rounded-xl space-y-1">
              <div class="text-brandAccent font-bold">2. CHOOSE</div>
              <p class="text-brandTextSecondary leading-snug text-[9px]">She clicks "Home Textile & Fast Fashion" on the grid.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3 rounded-xl space-y-1">
              <div class="text-brandAccent font-bold">3. VIEW</div>
              <p class="text-brandTextSecondary leading-snug text-[9px]">She sees the DGI Poseidon printer matched with INKTEX inks.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3 rounded-xl space-y-1">
              <div class="text-brandAccent font-bold">4. REQUEST</div>
              <p class="text-brandTextSecondary leading-snug text-[9px]">She slides printhead parameters and requests a custom quote.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3 rounded-xl space-y-1">
              <div class="text-brandAccent font-bold">5. CLOSE</div>
              <p class="text-brandTextSecondary leading-snug text-[9px]">Sales team calls Nour with a compiled brochure and closes the deal.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "4. The 9 Industry Showrooms",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Covering Your Entire Market Footprint</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            We have mapped out 9 distinct industry showrooms matching your fleet catalog:
          </p>
          <div class="grid grid-cols-3 gap-2 mt-2 text-left text-[10px] font-outfit">
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>01. Home Textile</strong><span class="block text-brandTextMetadata mt-0.5">Fashion & Fabrics</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>02. T-Shirts & Pieces</strong><span class="block text-brandTextMetadata mt-0.5">Direct DTG & DTF</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>03. Carpet & Rugs</strong><span class="block text-brandTextMetadata mt-0.5">Direct Pile Printing</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>04. CAD/CAM & Laser</strong><span class="block text-brandTextMetadata mt-0.5">GBOS Auto Cutting</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>05. Signage & Display</strong><span class="block text-brandTextMetadata mt-0.5">Odorless HP Latex</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>06. Wall Coverings</strong><span class="block text-brandTextMetadata mt-0.5">Embossed 3D Decors</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>07. Outdoor Adverts</strong><span class="block text-brandTextMetadata mt-0.5">5m Giant Billboards</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>08. Packaging & Labels</strong><span class="block text-brandTextMetadata mt-0.5">Corrugated Box Lines</span></div>
            <div class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg"><strong>09. Specialties</strong><span class="block text-brandTextMetadata mt-0.5">Giftware & Bottle Wraps</span></div>
          </div>
        </div>
      `
    },
    {
      title: "5. Real Catalog Sheets (Building Authenticity)",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Integrating Scanned Catalog Pages Page-for-Page</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            To make sure the website feels authentic and real to the clients, we extracted the 13 scanned pages of your official Solutions catalog:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-left font-outfit text-xs">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-2">
              <span class="text-brandAccent font-bold block">📄 Scanned Visual Validation</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Each sector displays its exact printed technical datasheet inside a lightbox zoom window. Factory managers can inspect schematics instantly on mobile or desktop.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-2">
              <span class="text-brandAccent font-bold block">🖨️ Toner-Saving Printing Overrides</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">High-resolution catalog images are automatically hidden when physical printing is triggered. This strips all black backdrops and saves expensive printer toner.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "6. The Digital Cost Assistant (ROI Modeler)",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Helping Factory Managers Estimate Their Profit Margins</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            We built an interactive profit calculator that speaks the print manager's language, converting technical output into real-world business numbers.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 text-left font-outfit text-xs">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">1. Choose Currency</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Factory managers can run cost projections dynamically in Egyptian Pounds (EGP), US Dollars (USD), or Saudi Riyals (SAR).</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">2. Input Rates</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Users slide parameters like daily production hours, local ink costs, and paper rates to customize calculations.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">3. View Returns</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">The calculator displays daily print volume (sqm), ink draw (liters), operational cost per sqm, and equipment payback timelines.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "7. The Digital Filing Cabinet (Total Control)",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Enabling Your Team to Edit the Catalog Without a Programmer</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            Instead of paying software developers to modify your catalog, your team has complete, independent control over inventory listings.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-left font-outfit text-xs">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-2">
              <span class="text-brandAccent font-bold block">🔑 Secure Passcode Access</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Your administration panel is locked behind a secure gateway passcode: <strong>egygrafx2026</strong>. No complicated usernames required.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-2">
              <span class="text-brandAccent font-bold block">📝 Simple 1-Click Form Sheets</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">To change a price, edit printhead options, or add a machine, your staff types details into a simple input sheet and clicks 'Save'. The website updates instantly.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "8. The 24/7 Digital Sales Assistant",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Capturing Pre-qualified Sales Leads Night and Day</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            The website acts as a tireless sales assistant, guiding high-intent B2B buyers from curiosity to quote submissions in seconds.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 text-left font-outfit text-xs">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">1. Dynamic RFQ</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Buyers select their desired width and head configurations, compiling an instant quotation booklet automatically.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">2. Automated Booklet</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">A customized technical quote booklet is compiled and sent to the client's inbox immediately, showing matched consumables.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">3. Immediate Lead Sync</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">The system automatically delivers pre-qualified lead sheets containing client email, phone, and budget to the EGYGRAFX sales desk.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "9. Factual Economic Investment Breakdown",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">A Highly Focused, Cost-Effective Investment Model</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            We have structured the entire development budget to match the agreed total of <strong>$1,450.00 USD</strong> with zero ongoing server costs:
          </p>
          <div class="grid grid-cols-2 gap-2 text-[10px] font-courier text-brandTextSecondary text-left pl-0 leading-tight">
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>1. 72-Hour Rapid Deployment Framework</span><span class="text-brandTextPrimary font-bold">$300</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>2. Multi-Page sitemap Gateway</span><span class="text-brandTextPrimary font-bold">$150</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>3. Supplier Brand Directories</span><span class="text-brandTextPrimary font-bold">$120</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>4. 9 Category Application Hubs</span><span class="text-brandTextPrimary font-bold">$100</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>5. Consumables Compatibility Matrix</span><span class="text-brandTextPrimary font-bold">$50</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>6. Secure Content Management & B2B CRM</span><span class="text-brandTextPrimary font-bold font-mono">$450</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>7. RFQ Configurator & Booklet</span><span class="text-brandTextPrimary font-bold">$280</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between text-brandAccent"><span>8. Analytics & Free-Zone Demo Area</span><span class="font-bold">INCLUDED</span></div>
          </div>
        </div>
      `
    },
    {
      title: "10. Cash Flow Protection (Staged Milestones)",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Staged Handovers to Guard Your Timeline & Cash Flow</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            To secure the foundational design assets first, the investment is staged across four progressive milestones:
          </p>
          <div class="overflow-x-auto w-full">
            <table class="w-full text-left text-xs border-collapse font-inter min-w-[450px]">
              <thead>
                <tr class="border-b border-brandBorder text-brandAccent font-courier uppercase text-[9px]">
                  <th class="py-2">Milestone Stage</th>
                  <th class="py-2">Concrete Deliverables Locked</th>
                  <th class="py-2 text-right">Investment Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-brandBorder/40">
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">60% Milestone 1</td>
                  <td class="py-2.5">Visual rebranding mockups, typography wordmark, and sitemap layouts.</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$870.00 USD</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">20% Milestone 2</td>
                  <td class="py-2.5">Staging deployment of the frontend catalog and 9 application hubs.</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$290.00 USD</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">10% Milestone 3</td>
                  <td class="py-2.5">Firestore cloud database, secure Clerk admin panel, and RFQ system.</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$145.00 USD</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">10% Milestone 4</td>
                  <td class="py-2.5">Production domain setup, Google SEO sweep, and operator training handoff.</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$145.00 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    }
  ];

  const prevSlide = useCallback(() => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex((prev) => prev - 1);
    }
  }, [activeSlideIndex]);

  const nextSlide = useCallback(() => {
    if (activeSlideIndex < slides.length - 1) {
      setActiveSlideIndex((prev) => prev + 1);
    }
  }, [activeSlideIndex, slides.length]);

  // Key press listeners for slideshow
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent slide change when user is typing in form elements
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA" ||
          document.activeElement.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight") {
        setActiveSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft") {
        setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length]);

  const activeSlide = slides[activeSlideIndex];
  const progressPercent = ((activeSlideIndex + 1) / slides.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto text-brandTextSecondary">
      
      {/* Viewport Intro Header */}
      <div className="bg-brandPanel border border-brandBorder rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-courier text-[10px] uppercase text-brandAccent tracking-widest bg-brandAccent/10 border border-brandAccent/20 px-2 py-0.5 rounded">Staging Deck</span>
            <span className="text-[10px] text-brandTextMetadata font-courier">MAPPED FOR ASHRAF</span>
          </div>
          <h2 className="font-serifTitle italic text-xl md:text-2xl font-bold text-brandTextPrimary">Corporate Proposal Presentation Slides</h2>
          <p className="text-[11px] text-brandTextSecondary max-w-lg leading-relaxed">
            Use the arrow controls below or press <kbd className="bg-brandBg border border-brandBorder px-1 rounded text-white font-mono">←</kbd> <kbd className="bg-brandBg border border-brandBorder px-1 rounded text-white font-mono">→</kbd> on your keyboard to navigate the corporate proposal.
          </p>
        </div>
        
        <div className="flex bg-brandBg border border-brandBorder rounded-full px-3 py-1 text-[10px] font-courier text-brandAccent select-none">
          <span className="text-brandTextSecondary">{activeSlideIndex + 1}</span>
          <span className="text-brandTextMetadata px-1">/</span>
          <span>{slides.length} Slides</span>
        </div>
      </div>

      {/* Main Slide Deck Frame */}
      <div 
        tabIndex={0}
        role="region"
        aria-live="polite"
        aria-label={`Slideshow Viewer: Slide ${activeSlideIndex + 1} of ${slides.length} - ${activeSlide.title}`}
        className="bg-brandPanel border border-brandBorder rounded-3xl overflow-hidden flex flex-col min-h-[440px] shadow-2xl relative focus-visible:ring-2 focus-visible:ring-brandAccent focus-visible:outline-none"
      >
        
        {/* Slide Frame Header */}
        <div className="bg-brandBg border-b border-brandBorder px-6 py-4 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brandAccent"></span>
            <span className="font-outfit text-xs font-bold text-brandTextPrimary tracking-wider uppercase">
              {activeSlide.title}
            </span>
          </div>
          <span className="text-[10px] font-courier text-brandTextMetadata">
            Ref: MV-2026-085 &bull; Slide {activeSlideIndex + 1}
          </span>
        </div>

        {/* Slide Progress Indicator Bar */}
        <div className="h-1 bg-brandBorder w-full relative">
          <div
            className="h-full bg-brandAccent transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Slide Frame Body (Interactive HTML Area) */}
        <div className="p-6 md:p-10 flex-grow flex flex-col justify-center text-center">
          <div
            key={activeSlideIndex} // Adding key triggers re-mount and runs animate-slide-fade keyframes
            className="w-full text-brandTextSecondary animate-slide-fade"
            dangerouslySetInnerHTML={{ __html: activeSlide.content }}
          ></div>
        </div>

        {/* Slide Frame Footer / Controllers */}
        <div className="bg-brandBg border-t border-brandBorder px-6 py-4 flex justify-between items-center select-none font-outfit">
          <button
            onClick={prevSlide}
            disabled={activeSlideIndex === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeSlideIndex === 0
                ? "text-brandTextMetadata/40 border border-brandBorder/40 cursor-not-allowed"
                : "text-brandTextSecondary hover:text-brandTextPrimary border border-brandBorder bg-brandPanel"
            }`}
          >
            <i className="fa-solid fa-chevron-left text-[10px]"></i> Previous
          </button>

          <span className="text-[9px] font-courier uppercase text-brandTextMetadata tracking-widest hidden sm:inline">
            EGYGRAFX B2B Matchmaker Proposal
          </span>

          <button
            onClick={nextSlide}
            disabled={activeSlideIndex === slides.length - 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeSlideIndex === slides.length - 1
                ? "text-brandTextMetadata/40 border border-brandBorder/40 cursor-not-allowed"
                : "bg-brandAccent hover:bg-brandAccentHover text-brandBg text-white shadow"
            }`}
          >
            Next <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>

      </div>

    </div>
  );
}
