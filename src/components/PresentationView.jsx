import { useState, useEffect, useCallback } from "react";

export default function PresentationView() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides = [
    {
      title: "1. The EGYGRAFX. Paradigm Shift",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">YOUR APPLICATIONS ↔ OUR SOLUTIONS</h4>
          <p class="text-xs md:text-sm leading-relaxed">
            Transitioning traditional listing directories into an intent-driven, matchmaking printing ecosystem for the Egyptian & Middle East B2B market.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div class="bg-brandBg/60 border border-brandBorder p-5 rounded-xl text-left">
              <span class="font-courier text-[10px] text-brandCrimson block mb-2 uppercase font-bold">Legacy product directory style</span>
              <ul class="list-disc pl-4 space-y-1 text-[11px]">
                <li>Disjointed specifications charts</li>
                <li>Overloaded and complex part specifications</li>
                <li>Traditional CMYK color swirl logos</li>
                <li>Exposes buyer to decision overload</li>
              </ul>
            </div>
            <div class="bg-brandBg/60 border border-brandAccent/20 p-5 rounded-xl text-left">
              <span class="font-courier text-[10px] text-brandAccent block mb-2 uppercase font-bold">New Matched solutions gateway</span>
              <ul class="list-disc pl-4 space-y-1 text-[11px] text-brandTextPrimary">
                <li>Capturing buyer intent directly</li>
                <li>Synchronized hardware, inks & substrates</li>
                <li>Typography-only geometric wordmark</li>
                <li>Prequalified leads and PDF proposals</li>
              </ul>
            </div>
          </div>
          <div class="text-xs italic text-brandTextMetadata font-serifTitle text-center mt-6">"Bridging industrial machinery capabilities with verified B2B applications."</div>
        </div>
      `
    },
    {
      title: "2. The B2B Customer Journey",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Nour's Fast Fashion Production Journey</h4>
          <p class="text-xs md:text-sm leading-relaxed">
            Framing the platform's behavior through a customer-centric B2B lead generation workflow:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4 text-center text-[10px] font-outfit">
            <div class="bg-brandBg/60 border border-brandBorder p-3.5 rounded-xl space-y-1.5">
              <div class="text-brandAccent font-bold">1. LAND</div>
              <p class="text-brandTextSecondary leading-snug">Nour opens the clean EGYGRAFX.COM on her mobile device.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3.5 rounded-xl space-y-1.5">
              <div class="text-brandAccent font-bold">2. SELECT</div>
              <p class="text-brandTextSecondary leading-snug">She clicks "Home Textile & Fast Fashion" on the grid.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3.5 rounded-xl space-y-1.5">
              <div class="text-brandAccent font-bold">3. CONFIGURE</div>
              <p class="text-brandTextSecondary leading-snug">She sees DGI Poseidon matched with INKTEX sublimation inks.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3.5 rounded-xl space-y-1.5">
              <div class="text-brandAccent font-bold">4. REQUEST</div>
              <p class="text-brandTextSecondary leading-snug">She adjusts width sliders and requests an automated quote.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-3.5 rounded-xl space-y-1.5">
              <div class="text-brandAccent font-bold">5. CLOSE</div>
              <p class="text-brandTextSecondary leading-snug">Sales team calls Nour with a compiled A4 PDF and closes the deal.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "3. B2B Information Architecture",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Information architecture sitemap tree</h4>
          <p class="text-xs">
            A simplified sitemap designed to route print directors instantly into matched production suites.
          </p>
          
          <div class="flex flex-col items-center gap-4 py-2">
            <div class="bg-brandBg border border-brandAccent px-4 py-1.5 rounded-lg text-xs font-courier uppercase text-brandAccent font-bold">egygrafx.com Home Gateway</div>
            <div class="w-[1px] h-4 bg-brandBorder"></div>
            <div class="flex gap-4 w-full justify-between max-w-lg text-center font-outfit text-[10px]">
              <div class="flex-1 bg-brandBg border border-brandBorder p-2 rounded-lg">
                <strong class="text-brandTextPrimary">1. Applications</strong>
                <span class="block text-brandTextMetadata mt-1">9 intent hubs</span>
              </div>
              <div class="flex-1 bg-brandBg border border-brandBorder p-2 rounded-lg">
                <strong class="text-brandTextPrimary">2. ROI Calculator</strong>
                <span class="block text-brandTextMetadata mt-1">Staging Cost Sheets</span>
              </div>
              <div class="flex-1 bg-brandBg border border-brandBorder p-2 rounded-lg">
                <strong class="text-brandTextPrimary">3. CMS & CRM</strong>
                <span class="block text-brandTextMetadata mt-1">Secure Control Panel</span>
              </div>
              <div class="flex-1 bg-brandBg border border-brandBorder p-2 rounded-lg">
                <strong class="text-brandTextPrimary">4. Slide Deck</strong>
                <span class="block text-brandTextMetadata mt-1">Rebrand Proposal</span>
              </div>
            </div>
          </div>
          
          <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl text-xs space-y-1">
            <div class="font-semibold text-brandTextPrimary">Dynamic Route Configurations:</div>
            <p class="text-brandTextSecondary font-inter">Our high-performance cloud network dynamically generates Google-optimized, search-friendly product pages instantly.</p>
          </div>
        </div>
      `
    },
    {
      title: "4. The \"Ecosystem\" Philosophy (AluBest Model)",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Building ecosystems instead of selling commodities</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            We model our strategy on the most successful B2B printing distributors like **AluBest Polska**, shifting the narrative from technical component specifications to complete operational systems.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 text-left font-outfit text-xs">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">1. Calibrated Sync</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">No printer runs in isolation. Hardware is automatically paired with compatibility-locked chemical inks and paper weights.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">2. Cairo Free Zone Demo</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Provides print directors a localized hands-on testing facility to verify substrate draw weights and speeds before purchasing.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">3. Capital Payback Modeler</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">B2B buyers do not calculate specifications. They calculate months of payback. We expose this data in real-time.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "5. Premier Supplier Brand Directory",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Coordinating our 9 premier industrial partners</h4>
          <p class="text-xs leading-relaxed">
            Integrating your key supplier networks into a unified brand directory catalog, mapping compatible substrates:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2">
            <div class="md:col-span-8 grid grid-cols-2 gap-2 font-mono text-[9px] uppercase tracking-wider text-brandTextPrimary">
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">HP Latex 🇺🇸</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">GBOS Laser 🇩🇪</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">JHF UV 🇨🇳</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">Monti Antonio 🇮🇹</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">ORIC Systems 🇨🇳</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">Boyin DTF 🇨🇳</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">DPI Sublimation 🇹🇼</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">Lintor Calenders 🇨🇳</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl">MAS Italy 🇮🇹</div>
              <div class="bg-brandBg border border-brandBorder p-2.5 rounded-xl font-bold text-brandAccent">Consumables Sync</div>
            </div>
            <div class="md:col-span-4 border border-brandBorder rounded-xl bg-brandBg/40 p-2 flex flex-col items-center justify-center print-machinery-hide gap-1.5">
              <img src="/machinery/page_1.jpeg" alt="Official Catalog Cover" class="h-auto max-h-[140px] object-contain rounded border border-brandBorder" />
              <span class="text-[8px] font-courier text-brandTextMetadata">Page 1: Catalog Cover</span>
            </div>
          </div>
          <p class="text-[10px] text-brandTextMetadata font-courier mt-2 uppercase text-center">Every supplier website is linked directly to enhance dynamic B2B credentials</p>
        </div>
      `
    },
    {
      title: "6. The 9-Sector Application Visual Layouts",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">9-Sector Visual Application Grid</h4>
          <p class="text-xs">
            Segmenting printing configurations by sector to route print directors seamlessly:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-8">
              <ul class="grid grid-cols-2 gap-2 text-[9px] font-courier text-brandTextSecondary list-none text-left pl-0">
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Home Textile (Page 3)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>T-Shirts & Pieces (Page 4)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Carpet & Rugs (Page 5)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Industrial CAD/CAM (Page 6)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Signage & Display (Page 7)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Wall Covering (Page 8)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Outdoor Adv (Page 9)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Packaging & Labels (Page 10)</li>
                <li class="bg-brandBg/60 border border-brandBorder p-2.5 rounded-lg flex items-center gap-2"><span class="w-1.5 h-1.5 bg-brandAccent rounded-full"></span>Promo Specialty (Page 11)</li>
              </ul>
            </div>
            <div class="md:col-span-4 border border-brandBorder rounded-xl bg-brandBg/40 p-2 flex flex-col items-center justify-center print-machinery-hide gap-1.5">
              <img src="/machinery/page_7.jpeg" alt="Signage Technical Catalog Sheet" class="h-auto max-h-[130px] object-contain rounded border border-brandBorder" />
              <span class="text-[8px] font-courier text-brandTextMetadata">Page 7: Signage & Display</span>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "7. Parameter Configurator & Yields",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Interactive parameter yield configurations</h4>
          <p class="text-xs leading-relaxed">
            Buyers configure printhead arrays and production shifts to see simulated output volumes:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-8 p-5 bg-brandBg/60 border border-brandBorder rounded-xl space-y-3 font-outfit text-xs text-left">
              <div class="flex justify-between"><span>Printhead arrays (2 to 32 Heads):</span><span class="text-brandAccent font-bold font-mono">Dynamic Upgrades</span></div>
              <div class="flex justify-between"><span>Production shifts (1 to 24 Hours):</span><span class="text-brandAccent font-bold font-mono">Dynamic Duty Limits</span></div>
              <div class="flex justify-between border-t border-brandBorder/50 pt-2 font-courier text-[10px] text-brandTextMetadata">
                <span>Dynamic yield equations:</span>
                <span>Speed * (Heads / defaultHeads) * Hours * 85%</span>
              </div>
            </div>
            <div class="md:col-span-4 border border-brandBorder rounded-xl bg-brandBg/40 p-2 flex flex-col items-center justify-center print-machinery-hide gap-1.5">
              <img src="/machinery/page_3.jpeg" alt="Home Textile Technical Catalog Sheet" class="h-auto max-h-[130px] object-contain rounded border border-brandBorder" />
              <span class="text-[8px] font-courier text-brandTextMetadata">Page 3: Textile Yield Sheet</span>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "8. Chemistry & Ink Consumption Models",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Consumable Ink Density & Coverage Multipliers</h4>
          <p class="text-xs">
            To prevent underestimating ink draw weights, the configurator maps specific ink multipliers per sector:
          </p>
          <div class="grid grid-cols-2 gap-4 font-outfit text-xs text-left">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-2">
              <span class="font-bold text-brandTextPrimary">Dye-Sublimation (calender sync)</span>
              <div class="flex justify-between"><span>Standard ink draw:</span><span class="font-mono">12 ml/sqm</span></div>
              <div class="flex justify-between text-brandAccent font-bold"><span>Coverage Multiplier:</span><span class="font-mono">1.0x</span></div>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-2">
              <span class="font-bold text-brandTextPrimary">Direct-to-Film (DTF high density)</span>
              <div class="flex justify-between"><span>Standard ink draw:</span><span class="font-mono">12 ml/sqm</span></div>
              <div class="flex justify-between text-brandAccent font-bold"><span>Coverage Multiplier:</span><span class="font-mono">2.1x (CMYK+W)</span></div>
            </div>
          </div>
          <p class="text-[9px] font-courier text-brandTextMetadata uppercase text-center mt-2">Laser cutting / marking systems map to a 0.0x multiplier</p>
        </div>
      `
    },
    {
      title: "9. Financial ROI Payback Modeler",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">ROI & payback speed progress model</h4>
          <p class="text-xs">
            An operational cost sheet that calculates investment returns in EGP, USD, SAR, or AED:
          </p>
          <div class="p-5 bg-brandBg/60 border border-brandBorder rounded-xl space-y-2.5 font-outfit text-xs text-left">
            <div class="flex justify-between"><span>Consumable Media + Ink cost / sqm:</span><span class="text-brandTextPrimary font-mono">Calculated Dynamically</span></div>
            <div class="flex justify-between"><span>Net gross profit margin / sqm:</span><span class="text-brandAccent font-bold font-mono">Real-time Margin %</span></div>
            <div class="flex justify-between border-t border-brandBorder/50 pt-2"><span>Capital Payback span (Months):</span><span class="text-brandTextPrimary font-bold font-mono">CapEx / Monthly Profit</span></div>
          </div>
          <p class="text-[9px] font-courier text-brandTextMetadata uppercase mt-2 text-center">Visualizes payback timeline progress against the standard 12-month limit</p>
        </div>
      `
    },
    {
      title: "10. Staging Cairo Free-Zone Demo center",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Cairo Free-Zone Free Staging Demonstration Zone</h4>
          <p class="text-xs md:text-sm leading-relaxed">
            Anyone can sell you a printer. EGYGRAFX builds verified production ecosystems. We invite B2B directors to test printhead arrays and calenders hands-on:
          </p>
          <div class="bg-brandBg/60 border border-brandBorder p-5 rounded-xl space-y-3 font-outfit text-xs text-left">
            <span class="font-courier text-[10px] text-brandAccent block uppercase font-bold">Staging Calendar bookings:</span>
            <ul class="list-disc pl-4 space-y-1 text-brandTextSecondary text-[11px]">
              <li>Configure customized substrate draw weights on the calenders</li>
              <li>Measure real-time electrical loads and ink yields directly on the digital monitors</li>
              <li>Schedule demo dates online; bookings route directly to our central sales pipeline</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      title: "11. Cloud CRM & Lead Pipeline Console",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Real-time leads stream tracking</h4>
          <p class="text-xs">
            Exposes active leads routed in real-time from matching configurations:
          </p>
          <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl text-xs space-y-2 text-left font-courier">
            <div class="text-[9px] text-brandAccent font-bold uppercase tracking-wider">Active Leads Pipeline</div>
            <div class="h-px bg-brandBorder my-1"></div>
            <div class="flex justify-between text-brandTextPrimary"><span>Nour Textiles Ltd</span><span>Active Staging Sync</span></div>
            <div class="flex justify-between text-brandTextPrimary"><span>Al-Ahram Advertising</span><span>Emailed to Sales Representative</span></div>
            <div class="flex justify-between text-brandTextPrimary"><span>Kamel Decor Heliopolis</span><span>Cairo Demo Scheduled</span></div>
          </div>
        </div>
      `
    },
    {
      title: "12. Secure Administrator Control Panel",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Guarding fleet machinery pricing tables</h4>
          <p class="text-xs md:text-sm leading-relaxed">
            To prevent unauthorized adjustments to pricing tables, the back-end catalog modifier is secured behind a passcode access checkpoint:
          </p>
          <div class="p-5 bg-brandBg/60 border border-brandBorder rounded-xl font-courier text-xs text-left space-y-2">
            <div class="flex justify-between items-center">
              <span>Access Bypass passcode:</span>
              <code class="bg-brandAccent/15 border border-brandAccent/30 text-brandAccent px-2.5 py-0.5 rounded font-bold">egygrafx2026</code>
            </div>
            <p class="text-[10px] text-brandTextMetadata font-inter leading-relaxed mt-2 border-t border-brandBorder/50 pt-2">
              Unlocks leads CRM lists, database specification forms, and system activity logs.
            </p>
          </div>
        </div>
      `
    },
    {
      title: "13. Programmatic SEO Search previews",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Dynamic Google search Result previews</h4>
          <p class="text-xs">
            Modifying pricing configurations in the CMS specs form instantly updates simulated search result snippets:
          </p>
          <div class="bg-brandBg border border-brandBorder rounded-xl p-4.5 space-y-1.5 text-left font-serif">
            <div class="text-[9px] font-mono text-emerald-500">https://egygrafx.com &gt; products &gt; hp-latex-r</div>
            <h5 class="text-sm font-bold text-sky-400 hover:underline cursor-pointer font-sans leading-none">
              HP Latex R Series Hybrid Specs & Matching Substrates | EGYGRAFX.
            </h5>
            <p class="text-[10px] text-brandTextSecondary font-sans leading-relaxed mt-1">
              Explore matches for the HP Latex R Series starting from $115,000 USD. Compatible with HP water-based Latex inks and Mactac Graphics wrap vinyls...
            </p>
          </div>
        </div>
      `
    },
    {
      title: "14. Automated RFQ PDF Custom Brochures",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Branded A4 PDF Brochure Generation</h4>
          <p class="text-xs md:text-sm leading-relaxed">
            Upon prequalification submission, the platform generates custom sheets of Nour's output volume forecasts, compatible media rolls, and power draws into a printable A4 booklet:
          </p>
          <div class="bg-brandBg/60 border border-brandBorder p-5 rounded-xl space-y-3 font-outfit text-xs text-left">
            <span class="font-courier text-[10px] text-brandAccent block uppercase font-bold">Brochure Details:</span>
            <ul class="list-disc pl-4 space-y-1 text-brandTextSecondary text-[11px]">
              <li>Includes direct signature blocks for representative execution</li>
              <li>A4 printable templates automatically strip dark slate backgrounds to optimize toner cost</li>
              <li>Exposes payment schedules and WhatsApp PDF delivery notifications</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      title: "15. Serverless Stack vs. WordPress",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Ongoing Hosting Costs (Serverless runs in the free tier)</h4>
          <p class="text-xs">
            Traditional WordPress setups cost Mr. Ashraf monthly maintenance fees. Our Next.js Serverless stack runs on exactly $0 to $20/month!
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl text-xs text-left">
              <span class="font-bold text-brandCrimson font-courier uppercase">WordPress (Directories)</span>
              <div class="h-px bg-brandBorder my-1.5"></div>
              <div class="flex justify-between py-0.5"><span>Hosting & DB:</span><span>$20-$50 / mo</span></div>
              <div class="flex justify-between py-0.5"><span>Security plugins:</span><span>$10-$20 / mo</span></div>
              <div class="flex justify-between py-0.5 font-bold text-brandCrimson mt-1 border-t border-brandBorder/40 pt-1"><span>Total monthly:</span><span>$30 - $70 / mo</span></div>
            </div>
            <div class="bg-brandBg/60 border border-brandAccent/20 p-4 rounded-xl text-xs text-brandTextPrimary text-left">
              <span class="font-bold text-emerald-500 font-courier uppercase">Serverless (EGYGRAFX Stack)</span>
              <div class="h-px bg-brandBorder my-1.5"></div>
              <div class="flex justify-between py-0.5"><span>Secure Cloud Database (Firebase):</span><span class="text-emerald-500 font-bold">$0.00 / mo</span></div>
              <div class="flex justify-between py-0.5"><span>Secure Authentication:</span><span class="text-emerald-500 font-bold">$0.00 / mo</span></div>
              <div class="flex justify-between py-0.5 font-bold text-brandAccent mt-1 border-t border-brandBorder/40 pt-1"><span>Total monthly:</span><span>$0.00 - $20 / mo</span></div>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "16. Rebranding visual tokens",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Adhering strictly to Mitry Visuals</h4>
          <p class="text-xs leading-relaxed text-left">
            We reject CMYK swirls and generic templates, crafting visual design system elements aligned directly with the dominant colors of your new corporate logos:
          </p>
          <div class="p-5 bg-brandBg/60 border border-brandBorder rounded-xl space-y-3 font-outfit text-xs text-left">
            <div class="flex justify-between"><span>Primary Action Color:</span><span class="text-brandAccent font-bold font-mono">Logo Coral Orange (#FD6B56)</span></div>
            <div class="flex justify-between"><span>Secondary Accent Color:</span><span class="text-brandCrimson font-bold font-mono">Deep Crimson (#BD0335)</span></div>
            <div class="flex justify-between"><span>Page Background:</span><span class="text-slate-400 font-mono">Charcoal (#0A0A0A)</span></div>
            <div class="flex justify-between"><span>Panel Background:</span><span class="text-slate-400 font-mono">Card Panels (#121212)</span></div>
          </div>
        </div>
      `
    },
    {
      title: "17. Project milestones breakdown ($1,450.00)",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Staged payment milestones schedule</h4>
          <p class="text-xs">
            The project investment is staged across four payment milestones with zero ongoing hosting fees:
          </p>
          <div class="overflow-x-auto w-full">
            <table class="w-full text-left text-xs border-collapse font-inter min-w-[450px]">
              <thead>
                <tr class="border-b border-brandBorder text-brandAccent font-courier uppercase text-[9px]">
                  <th class="py-2">Payment Milestone</th>
                  <th class="py-2">Deliverables Deployed</th>
                  <th class="py-2 text-right">Investment Amount</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-brandBorder/40">
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">60% Milestone 1</td>
                  <td class="py-2.5">Visual rebranding guidelines, typography wordmark, sitemap layouts</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$870.00 USD</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">20% Milestone 2</td>
                  <td class="py-2.5">Staging integration of sitemaps and 9 core application gateways</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$290.00 USD</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">10% Milestone 3</td>
                  <td class="py-2.5">Backend Integration: Secure cloud database, multi-user authentication, RFQ configurator</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$145.00 USD</td>
                </tr>
                <tr>
                  <td class="py-2.5 font-bold text-brandTextPrimary">10% Milestone 4</td>
                  <td class="py-2.5">Production handoff, Google SEO registration, domain pointing, training</td>
                  <td class="py-2.5 text-right font-courier text-brandAccent">$145.00 USD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    },
    {
      title: "18. Economic Value line items",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Factual breakdown of grand total investment</h4>
          <p class="text-xs">
            Itemized list sums exactly to the B2B proposal total of **$1,450.00 USD**:
          </p>
          <div class="grid grid-cols-2 gap-3 text-[10px] font-courier text-brandTextSecondary text-left pl-0 leading-tight">
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>1. 72-Hour Rapid Deployment Framework</span><span class="text-brandTextPrimary font-bold">$300</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>2. Multi-Page sitemap Gateway</span><span class="text-brandTextPrimary font-bold">$150</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>3. Supplier Brand Directories</span><span class="text-brandTextPrimary font-bold">$120</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>4. 9 Category Application Hubs</span><span class="text-brandTextPrimary font-bold">$100</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>5. Consumables Compatibility Matrix</span><span class="text-brandTextPrimary font-bold">$50</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>6. Secure Content Management & B2B CRM</span><span class="text-brandTextPrimary font-bold font-mono">$450</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between"><span>7. RFQ Configurator & Booklet</span><span class="text-brandTextPrimary font-bold">$280</span></div>
            <div class="bg-brandBg border border-brandBorder p-2 rounded flex justify-between text-brandAccent"><span>8. Analytics & Cairo Demo</span><span class="font-bold">INCLUDED</span></div>
          </div>
        </div>
      `
    },
    {
      title: "19. Ultra-Fast Load Speeds & Global Reliability",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Engineered for Rapid Response Times on Mobile & Desktop</h4>
          <p class="text-xs md:text-sm leading-relaxed text-left">
            We leverage a modern high-performance static build pipeline, transferring processing load from traditional databases to a global Content Delivery Network (CDN) to ensure lightning-fast speeds.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 text-left font-outfit text-xs">
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">1. 500ms Instant Render</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Pages load almost instantly under mobile network conditions across Egypt, maintaining a smooth, lag-free user experience.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">2. Compression Optimized</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Automated asset minification strips empty overhead, reducing initial page download weights by over 75%.</p>
            </div>
            <div class="bg-brandBg/60 border border-brandBorder p-4 rounded-xl space-y-1">
              <span class="text-brandAccent font-bold block">3. Global CDN Caching</span>
              <p class="text-[11px] text-brandTextSecondary leading-relaxed">Files are cached and served from the nearest regional data center, bypassing central server delays and blocking cyber-attacks.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "20. Sign-off and Proposal Acceptance",
      content: `
        <div class="space-y-4">
          <h4 class="font-serifTitle italic text-xl text-brandAccent font-bold">Proposal acceptance sign-off block</h4>
          <p class="text-xs">
            Confirm and execute the transition of EGYGRAFX to the new serverless matching gateway:
          </p>
          <div class="grid grid-cols-2 gap-8 border-t border-brandBorder/50 pt-8 mt-6 font-courier text-[9px] uppercase tracking-wider text-brandTextMetadata text-left">
            <div class="border-t border-dashed border-brandBorder/80 pt-3 space-y-1">
              <div>Prepared by EGYGRAFX Representative</div>
              <div class="h-6"></div>
              <div class="font-bold text-brandTextPrimary text-[10px]">LEAD SYSTEMS ARCHITECT</div>
            </div>
            <div class="border-t border-dashed border-brandBorder/80 pt-3 space-y-1">
              <div>Accepted by EGYGRAFX Executive</div>
              <div class="h-6"></div>
              <div class="font-bold text-brandTextPrimary text-[10px]">AUTHORIZED SIGNATURE</div>
            </div>
          </div>
          <div class="text-[9px] font-courier text-brandAccent uppercase tracking-widest text-center mt-4 font-bold select-none">
            YOUR APPLICATIONS ↔ OUR SOLUTIONS
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
