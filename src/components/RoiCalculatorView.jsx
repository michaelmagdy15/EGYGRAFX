import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function RoiCalculatorView() {
  const { database, activeSectorId } = useApp();
  const activeSector = database.find((s) => s.id === activeSectorId) || database[0];
  // Currency settings
  const [currency, setCurrency] = useState("EGP");

  // Operational states (in USD equivalent, converted dynamically on render)
  const [capex, setCapex] = useState(120000); // CapEx
  const [dailyVolume, setDailyVolume] = useState(2500); // Daily printing volume
  const [inkCost, setInkCost] = useState(18); // Ink cost per liter ($18 USD default ~850 EGP)
  const [mediaCost, setMediaCost] = useState(0.95); // Media roll cost per sqm ($0.95 USD default ~45 EGP)
  const [inkDraw, setInkDraw] = useState(12); // Ink draw (ml / sqm)
  const [hourlyOverhead, setHourlyOverhead] = useState(8.5); // Hourly factory overhead ($8.5 USD default ~400 EGP)
  const [printSpeed, setPrintSpeed] = useState(350); // Speed (sqm/h)
  const [sellingPrice, setSellingPrice] = useState(2.0); // Selling price per printed sqm ($2.0 USD ~95 EGP)

  // Rates (Base: 1 USD)
  const rates = {
    USD: 1.0,
    EGP: 48.0,
    SAR: 3.75,
    AED: 3.67,
  };

  const currentRate = rates[currency] || 48.0;

  // MATH CALCULATIONS
  // Convert local values back to USD equivalents for standard calculations, or calculate in USD and convert outputs
  // Direct Ink Cost per sqm = (inkDraw ml / 1000) * inkCost per L
  const directInkCostSqm = (inkDraw / 1000) * inkCost;
  // Direct Overhead Cost per sqm = hourlyOverhead / printSpeed
  const directOverheadCostSqm = hourlyOverhead / printSpeed;
  // Total Direct Cost per sqm = mediaCost + directInkCostSqm + directOverheadCostSqm
  const totalDirectCostSqm = mediaCost + directInkCostSqm + directOverheadCostSqm;

  // Margin per sqm = sellingPrice - totalDirectCostSqm
  const marginSqm = sellingPrice - totalDirectCostSqm;
  // Gross Margin Ratio = (marginSqm / sellingPrice) * 100
  const grossMarginRatio = sellingPrice > 0 ? (marginSqm / sellingPrice) * 100 : 0;

  // Monthly Gross Profit = marginSqm * dailyVolume * 30 days
  const monthlyGrossProfit = marginSqm * dailyVolume * 30;

  // Payback Period (Months) = capex / monthlyGrossProfit
  const paybackMonths = monthlyGrossProfit > 0 ? capex / monthlyGrossProfit : 99.9;

  // Formatting helpers
  const formatVal = (val) => {
    const converted = val * currentRate;
    if (Math.abs(converted) >= 1000) {
      return Math.round(converted).toLocaleString();
    }
    return converted.toFixed(2);
  };

  const formatCurrency = (val) => {
    const formatted = formatVal(val);
    return currency === "USD" ? `$${formatted}` : `${currency} ${formatted}`;
  };

  const paybackText = monthlyGrossProfit <= 0 
    ? "Never (Negative Margin)" 
    : paybackMonths > 60 
      ? "Over 5 Years" 
      : `${paybackMonths.toFixed(1)} Months`;

  const hoursPerDay = dailyVolume / printSpeed;

  // Payback bar limit
  const maxLimitMonths = 12;
  const paybackPercent = monthlyGrossProfit <= 0 ? 0 : Math.min((paybackMonths / maxLimitMonths) * 100, 100);

  // Dynamic slider ranges scaled to local currency
  const capexMin = 10000 * currentRate;
  const capexMax = 250000 * currentRate;
  const capexStep = 5000 * currentRate;

  const inkCostMin = 5 * currentRate;
  const inkCostMax = 150 * currentRate;
  const inkCostStep = 1 * currentRate;

  const mediaCostMin = 0.1 * currentRate;
  const mediaCostMax = 10.0 * currentRate;
  const mediaCostStep = 0.05 * currentRate;

  const hourlyOverheadMin = 1.0 * currentRate;
  const hourlyOverheadMax = 50.0 * currentRate;
  const hourlyOverheadStep = 0.5 * currentRate;

  const sellingPriceMin = 0.5 * currentRate;
  const sellingPriceMax = 25.0 * currentRate;
  const sellingPriceStep = 0.1 * currentRate;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Intro header */}
      <div className="bg-brandPanel border border-brandBorder rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-courier text-[10px] uppercase text-brandAccent tracking-widest bg-brandAccent/10 border border-brandAccent/20 px-2 py-0.5 rounded">Financial Suite</span>
            <span className="text-[10px] text-brandTextMetadata font-courier">MAPPED FOR ASHRAF</span>
          </div>
          <h2 className="font-serifTitle italic text-2xl md:text-3xl font-bold text-brandTextPrimary">Operational ROI Payback Modeler</h2>
          <p className="text-xs text-brandTextSecondary max-w-xl leading-relaxed font-inter">
            Calculate your direct printing costs, gross margins, and machinery investment return timelines dynamically. Toggle currencies to generate localized client cost-sheets.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex bg-brandBg border border-brandBorder rounded-xl p-1 gap-1 w-full sm:w-auto">
          {Object.keys(rates).map((cur) => (
            <button
              key={cur}
              onClick={() => setCurrency(cur)}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg font-outfit text-xs font-bold transition-all cursor-pointer ${
                currency === cur
                  ? "bg-brandAccent text-brandBg shadow"
                  : "text-brandTextSecondary hover:text-brandTextPrimary"
              }`}
            >
              {cur}
            </button>
          ))}
        </div>
      </div>

      {/* Main grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sliders (Left Column) */}
        <div className="lg:col-span-7 bg-brandPanel border border-brandBorder rounded-2xl p-6 space-y-6">
          <h3 className="font-serifTitle italic text-base font-bold text-brandTextPrimary border-b border-brandBorder pb-2 flex gap-2 items-center">
            <i className="fa-solid fa-gears text-brandAccent"></i> Factory Cost & Speed Parameters
          </h3>

          {/* CapEx Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Machinery CapEx Investment</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {formatCurrency(capex)}
              </span>
            </div>
            <input
              type="range"
              min={capexMin}
              max={capexMax}
              step={capexStep}
              value={capex * currentRate}
              onChange={(e) => setCapex((parseFloat(e.target.value) || 0) / currentRate)}
              aria-label="Machinery CapEx Investment"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
          </div>

          {/* Daily Volume Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Daily Print Volume (sqm)</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {dailyVolume.toLocaleString()} sqm / day
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={dailyVolume}
              onChange={(e) => setDailyVolume(parseInt(e.target.value))}
              aria-label="Daily Print Volume in square meters"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
            {/* Required running time fleet validation warning */}
            {hoursPerDay > 24 ? (
              <div className="text-[10px] text-brandCrimson font-mono flex items-center gap-1">
                <span>⚠️ Required operating time ({hoursPerDay.toFixed(1)} hrs/day) exceeds 24h. Suggests {Math.ceil(hoursPerDay / 24)} print lines running in parallel.</span>
              </div>
            ) : (
              <div className="text-[9px] text-brandTextMetadata font-mono">
                Running active line {hoursPerDay.toFixed(1)} hours / day to hit target volume.
              </div>
            )}
          </div>

          {/* Ink Cost Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Ink Cost per Liter</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {formatCurrency(inkCost)} / L
              </span>
            </div>
            <input
              type="range"
              min={inkCostMin}
              max={inkCostMax}
              step={inkCostStep}
              value={inkCost * currentRate}
              onChange={(e) => setInkCost((parseFloat(e.target.value) || 0) / currentRate)}
              aria-label="Ink Cost per Liter"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
          </div>

          {/* Substrate Media Cost Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Substrate Paper / Film (sqm)</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {formatCurrency(mediaCost)} / sqm
              </span>
            </div>
            <input
              type="range"
              min={mediaCostMin}
              max={mediaCostMax}
              step={mediaCostStep}
              value={mediaCost * currentRate}
              onChange={(e) => setMediaCost((parseFloat(e.target.value) || 0) / currentRate)}
              aria-label="Substrate Paper or Film Cost per square meter"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
          </div>

          {/* Ink Draw Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Ink Draw Weight (ml / sqm)</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {inkDraw} ml / sqm
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={inkDraw}
              onChange={(e) => setInkDraw(parseInt(e.target.value))}
              aria-label="Ink Draw Weight in milliliters per square meter"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
          </div>

          {/* Hourly Overheads Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Hourly Overheads (Rent, Labor, Power)</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {formatCurrency(hourlyOverhead)} / hr
              </span>
            </div>
            <input
              type="range"
              min={hourlyOverheadMin}
              max={hourlyOverheadMax}
              step={hourlyOverheadStep}
              value={hourlyOverhead * currentRate}
              onChange={(e) => setHourlyOverhead((parseFloat(e.target.value) || 0) / currentRate)}
              aria-label="Hourly Overheads including Rent, Labor, and Power"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
          </div>

          {/* Speed Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Average Printing Speed (sqm/h)</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {printSpeed} sqm / hr
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={1500}
              step={10}
              value={printSpeed}
              onChange={(e) => setPrintSpeed(parseInt(e.target.value))}
              aria-label="Average Printing Speed in square meters per hour"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
          </div>

          {/* Retail Selling Price Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[10px] font-courier uppercase text-brandTextMetadata font-bold">Retail Printing Selling Price (sqm)</span>
              <span className="text-xs bg-brandAccent/10 border border-brandAccent/20 px-2.5 py-0.5 rounded text-brandAccent font-bold font-mono">
                {formatCurrency(sellingPrice)} / sqm
              </span>
            </div>
            <input
              type="range"
              min={sellingPriceMin}
              max={sellingPriceMax}
              step={sellingPriceStep}
              value={sellingPrice * currentRate}
              onChange={(e) => setSellingPrice((parseFloat(e.target.value) || 0) / currentRate)}
              aria-label="Retail Printing Selling Price per square meter"
              className="w-full accent-brandAccent cursor-pointer h-1.5 rounded-lg bg-brandBg"
            />
          </div>

        </div>

        {/* Results Modeler Sheet (Right Column) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-brandPanel border border-brandBorder rounded-2xl p-6 flex flex-col gap-6">
            <h3 className="font-serifTitle italic text-base font-bold text-brandTextPrimary border-b border-brandBorder pb-2 flex gap-2 items-center">
              <i className="fa-solid fa-chart-pie text-brandAccent"></i> Financial cost-sheet modeler
            </h3>

            {/* margin cost breakdown table */}
            <div className="space-y-4 text-xs font-outfit">
              <div className="flex justify-between items-center border-b border-brandBorder/50 pb-2.5">
                <span className="text-brandTextSecondary">Direct Consumable Media:</span>
                <span className="text-brandTextPrimary font-bold font-mono">{formatCurrency(mediaCost)} / sqm</span>
              </div>
              <div className="flex justify-between items-center border-b border-brandBorder/50 pb-2.5">
                <span className="text-brandTextSecondary">Direct Ink Fluid Cost:</span>
                <span className="text-brandTextPrimary font-bold font-mono">{formatCurrency(directInkCostSqm)} / sqm</span>
              </div>
              <div className="flex justify-between items-center border-b border-brandBorder/50 pb-2.5">
                <span className="text-brandTextSecondary">Direct Factory Overhead:</span>
                <span className="text-brandTextPrimary font-bold font-mono">{formatCurrency(directOverheadCostSqm)} / sqm</span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-brandBorder pb-3 text-sm">
                <span className="text-brandTextPrimary font-bold">Total Direct Printing Cost:</span>
                <span className="text-brandTextPrimary font-extrabold font-mono">{formatCurrency(totalDirectCostSqm)} / sqm</span>
              </div>

              {/* Selling / Profit Margin stats */}
              <div className="flex justify-between items-center border-b border-brandBorder/50 pb-2.5 text-slate-300">
                <span className="text-brandTextSecondary font-semibold">Retail Price per sqm:</span>
                <span className="font-bold font-mono">{formatCurrency(sellingPrice)} / sqm</span>
              </div>
              <div className="flex justify-between items-center border-b border-brandBorder/50 pb-2.5 text-brandAccent">
                <span className="font-bold">Net Gross Profit Margin:</span>
                <span className={`font-extrabold font-mono ${marginSqm <= 0 ? "text-brandCrimson" : "text-brandAccent"}`}>
                  {formatCurrency(marginSqm)} / sqm
                </span>
              </div>
              <div className="flex justify-between items-center border-b-2 border-brandBorder pb-3 text-emerald-500 font-semibold">
                <span>Gross Margin Ratio:</span>
                <span className={`font-extrabold font-mono ${grossMarginRatio <= 0 ? "text-brandCrimson" : "text-emerald-500"}`}>
                  {grossMarginRatio.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Monthly Profit & Payback Forecast boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brandBg/60 border border-brandBorder rounded-xl p-4 text-center space-y-1">
                <div className="text-[8px] font-courier uppercase text-brandTextMetadata tracking-wider">
                  Monthly Gross Profits
                </div>
                <div className={`text-base font-extrabold font-mono ${monthlyGrossProfit <= 0 ? "text-brandCrimson" : "text-emerald-500"}`}>
                  {formatCurrency(monthlyGrossProfit)}
                </div>
                <div className="text-[9px] text-brandTextMetadata font-inter">
                  Running 30 production days
                </div>
              </div>

              <div className="bg-brandBg/60 border border-brandBorder rounded-xl p-4 text-center space-y-1">
                <div className="text-[8px] font-courier uppercase text-brandTextMetadata tracking-wider">
                  Capital Payback Timeline
                </div>
                <div className={`text-base font-extrabold font-mono ${monthlyGrossProfit > 0 && paybackMonths <= 6 ? "text-emerald-500" : monthlyGrossProfit > 0 && paybackMonths <= 12 ? "text-brandAccent" : "text-brandCrimson"}`}>
                  {paybackText}
                </div>
                <div className="text-[9px] text-brandTextMetadata font-inter">
                  Investment recovery span
                </div>
              </div>
            </div>

            {/* Active payback timeline progress indicator */}
            <div className="w-full flex flex-col gap-2 pt-2">
              <div className="flex justify-between items-center text-[10px] font-courier uppercase tracking-wider text-brandTextSecondary">
                <span>Payback Speed Progress</span>
                <span className={`font-mono font-bold ${monthlyGrossProfit > 0 && paybackMonths <= 12 ? "text-emerald-500" : "text-brandCrimson"}`}>
                  {monthlyGrossProfit <= 0 ? "Blocked" : `${paybackMonths.toFixed(1)} / ${maxLimitMonths} Months Limit`}
                </span>
              </div>
              
              {/* Progress Track */}
              <div className="h-2.5 w-full bg-brandBg rounded-full overflow-hidden border border-brandBorder">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    monthlyGrossProfit <= 0 
                      ? "bg-brandCrimson"
                      : paybackMonths <= 6
                      ? "bg-emerald-500"
                      : paybackMonths <= 12
                      ? "bg-brandAccent"
                      : "bg-brandCrimson"
                  }`}
                  style={{ width: `${monthlyGrossProfit <= 0 ? 100 : paybackPercent}%` }}
                ></div>
              </div>
              
              <div className="text-[9px] font-courier text-brandTextMetadata uppercase text-center mt-1">
                {monthlyGrossProfit <= 0 && "Error: Negative operating margin makes CapEx payback impossible"}
                {monthlyGrossProfit > 0 && paybackMonths <= 6 && "Highly recommended: ultra-rapid capex recovery speed"}
                {monthlyGrossProfit > 0 && paybackMonths > 6 && paybackMonths <= 12 && "Normal payback: matches standard industrial 12-mo scale"}
                {monthlyGrossProfit > 0 && paybackMonths > 12 && "Caution: payback recovery timeline exceeds standard 12-month limit"}
              </div>
            </div>

          </div>

          {/* Authentic Catalog Technical Sheet Sidebar */}
          {activeSector && activeSector.image && (
            <div className="bg-brandPanel border border-brandBorder rounded-2xl p-6 print-machinery-hide space-y-4 animate-slide-fade">
              <h4 className="font-serifTitle italic text-sm font-bold text-brandTextPrimary border-b border-brandBorder pb-2.5 flex justify-between items-center">
                <span className="flex gap-2 items-center">
                  <i className="fa-solid fa-file-pdf text-brandAccent"></i> Matched Sector Technical Sheet
                </span>
                <span className="text-[9px] font-mono uppercase bg-brandAccent/10 border border-brandAccent/20 px-2 py-0.5 rounded text-brandAccent font-bold">
                  {activeSector.tag}
                </span>
              </h4>
              <p className="text-[10px] text-brandTextSecondary leading-relaxed font-inter">
                Visual engineering specifications from the official EGYGRAFX printing solutions handbook matching the active <strong className="text-brandTextPrimary">{activeSector.title}</strong> sector.
              </p>
              <div className="relative overflow-hidden rounded-xl border border-brandBorder bg-brandBg flex items-center justify-center p-2">
                <img
                  src={activeSector.image}
                  alt={`${activeSector.title} Catalog Page`}
                  className="w-full h-auto max-h-[300px] object-contain rounded transition-transform duration-500 hover:scale-102"
                />
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
