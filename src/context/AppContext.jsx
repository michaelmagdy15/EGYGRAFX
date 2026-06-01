/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

const AppContext = createContext();

let leadCounter = Date.now();
const generateLeadId = () => {
  return `ld_${leadCounter++}`;
};

const getInitialLogs = () => [
  { timestamp: new Date().toLocaleTimeString(), message: "Clerk Authentication Sandbox initialized." },
  { timestamp: new Date().toLocaleTimeString(), message: "Firestore database collections synced successfully." }
];

const initialDatabase = [
  {
    id: "home-textile",
    image: "/machinery/page_3.jpeg",
    tag: "Sector 01",
    title: "Home Textile & Fast Fashion",
    description: "Industrial dye-sublimation and direct-to-fabric solutions matched with high-yield thermal calenders and digital fabric cutting laser lines. Deployed for Nour's textile mill.",
    hardware: [
      {
        id: "dgi-poseidon-2",
        brand: "DGI",
        model: "Poseidon II Sublimation",
        origin: "South Korea / China",
        heads: "Kyocera Piezo Heads",
        defaultHeads: 8,
        maxWidth: "1.82 meters",
        widths: [1.62, 1.82],
        speed: 450, // sqm/hr
        powerDraw: 12.0, // kW
        basePrice: 85000,
        note: "Industry benchmark for high-speed continuous roll sublimation.",
        inkSystem: "INKTEX Premium Dye-Sublimation Ink",
        mediaSystem: "NOVARES ROMA 8 Sublimation Paper"
      },
      {
        id: "novares-roma-8",
        brand: "Novares",
        model: "ROMA 8 Sublimation",
        origin: "Italy / China",
        heads: "Kyocera Piezo Heads",
        defaultHeads: 8,
        maxWidth: "1.80 meters",
        widths: [1.80, 2.20],
        speed: 400,
        powerDraw: 11.0,
        basePrice: 95000,
        note: "Italian engineering chassis matched with high-durability electronics.",
        inkSystem: "INKTEX Premium Dye-Sublimation Ink",
        mediaSystem: "NOVARES ROMA 8 Sublimation Paper"
      }
    ],
    ink: {
      name: "INKTEX Sublimation Ink Suite",
      brand: "INKTEX",
      origin: "South Korea",
      type: "Dye-Sublimation Fluid (Oeko-Tex Certified)",
      headsOptimized: "Kyocera / Epson optimized",
      packaging: "5L / 10L Industrial Jugs",
      properties: "Ultra-high pigment density, instantaneous curing speed, rich solid blacks, and standard Oeko-Tex Eco-Passport certificate."
    },
    media: {
      name: "NOVARES ROMA 8 Sublimation Paper",
      brand: "Novares",
      origin: "Italy",
      weight: "45 gsm - 70 gsm",
      widths: "1.62m, 1.82m widths",
      finishes: "Premium fast-dry clay coating",
      properties: "99% ink transfer yield, dimensional stability against heavy ink load, and minimal thermal shrinkage."
    }
  },
  {
    id: "t-shirts",
    image: "/machinery/page_4.jpeg",
    tag: "Sector 02",
    title: "T-Shirts & Piece Printing",
    description: "Direct-to-Garment (DTG) and Direct-to-Film (DTF) hybrid suites. Coordinated white and CMYK elastic pigment inks matched with automated powder finishing shakers.",
    hardware: [
      {
        id: "polyprint-filmjet",
        brand: "PolyPrint",
        model: "FILMJET DTF Roll-to-Roll",
        origin: "Greece",
        heads: "Epson i3200 Heads",
        defaultHeads: 4,
        maxWidth: "0.60 meters",
        widths: [0.60],
        speed: 35,
        powerDraw: 4.5,
        basePrice: 28000,
        note: "Advanced DTF system with automated powder applicator and inline conveyor dryer.",
        inkSystem: "INKTEX DTF Premium Pigment Ink",
        mediaSystem: "Double-Matte Hot Peel DTF Film"
      }
    ],
    ink: {
      name: "INKTEX DTF Elastic Inks",
      brand: "INKTEX",
      origin: "South Korea",
      type: "Elastic Pigment Ink (White & CMYK)",
      headsOptimized: "Epson i3200 optimized",
      packaging: "1L Bottles / 5L Jugs",
      properties: "Excellent washing stretchability, zero white ink clogging due to active circulation pump sync, and high opacity solid white layer."
    },
    media: {
      name: "Premium Hot/Cold Peel DTF Film",
      brand: "EGYGRAFX Coordinated",
      origin: "Taiwan",
      weight: "75 micron double-matte",
      widths: "60cm widths",
      finishes: "Double-sided anti-static coating",
      properties: "Perfect powder release, high ink absorption capacity, and crisp detail print resolution."
    }
  },
  {
    id: "carpet-rugs",
    image: "/machinery/page_5.jpeg",
    tag: "Sector 03",
    title: "Carpet, Mats & Rugs",
    description: "Super-wide direct-to-carpet and dye-sublimation solutions. Heavy-duty Starfire printing heads paired with high-pile piece-to-piece vacuum laminating calenders.",
    hardware: [
      {
        id: "oric-tx-carpet",
        brand: "ORIC",
        model: "TX Carpet Sublimation",
        origin: "China",
        heads: "Epson i3200 Heads",
        defaultHeads: 12,
        maxWidth: "4.30 meters",
        widths: [3.20, 4.30],
        speed: 280,
        powerDraw: 18.0,
        basePrice: 85000,
        note: "Extra-wide format dye sublimation printer targeting luxury carpets and mats.",
        inkSystem: "Atexco approved Sublimation Inks",
        mediaSystem: "High-absorption thick Sublimation Paper"
      }
    ],
    ink: {
      name: "High-Penetration Carpet Inks",
      brand: "Sun Chemical / MS",
      origin: "USA / Europe",
      type: "Heavy Disperse / Acid Fluid",
      headsOptimized: "Starfire 1024 optimized",
      packaging: "20L Industrial Kegs",
      properties: "Acid-free chemical formulation, optimized viscosity for deep pile vertical capillary migration, and excellent sun exposure UV lightfastness."
    },
    media: {
      name: "Heavy High-Absorption Sublimation Paper",
      brand: "Novares Coordinated",
      origin: "Italy",
      weight: "90 gsm - 120 gsm",
      widths: "3.2m, 4.3m extra-wide widths",
      finishes: "High-capacity clay release coating",
      properties: "Eliminates fiber ghosting, handles heavy ink loading without wrinkling, and maintains lateral roll alignment."
    }
  },
  {
    id: "industrial-cad",
    image: "/machinery/page_6.jpeg",
    tag: "Sector 04",
    title: "Hi-Tech Industrial CAD/CAM",
    description: "Precision laser marking and automated knife cutting systems engineered for automotive interior leather cutting and footwear manufacturing lines.",
    hardware: [
      {
        id: "gbos-automotive",
        brand: "GBOS",
        model: "Automotive Laser & Knife System",
        origin: "China / Germany",
        heads: "German Sealed CO2 Laser Tube",
        defaultHeads: 2,
        maxWidth: "2.50 meters",
        widths: [1.80, 2.50],
        speed: 950,
        powerDraw: 15.0,
        basePrice: 145000,
        note: "Automatic leather nest nesting software with high-speed heavy cutting knife.",
        inkSystem: "Not Applicable (Thermal Laser Cut)",
        mediaSystem: "Genuine Leather / Automotive Alcantara Rolls"
      }
    ],
    ink: {
      name: "Not Applicable (Thermal Laser)",
      brand: "CO2 Sealed Tube",
      origin: "Germany",
      type: "Laser cutting, no fluid",
      headsOptimized: "Coherent tube optimized",
      packaging: "N/A",
      properties: "Thermal laser marking and precision cutting loops without consumables draw."
    },
    media: {
      name: "Genuine Leather & Alcantara Rolls",
      brand: "EGYGRAFX Coordinated",
      origin: "Local / Italy",
      weight: "Various hides",
      widths: "1.80m / 2.50m hides",
      finishes: "Uncoated natural grains",
      properties: "Excellent nesting compatibility with GBOS visual projection cameras."
    }
  },
  {
    id: "signage-display",
    image: "/machinery/page_7.jpeg",
    tag: "Sector 05",
    title: "Signage & Display",
    description: "Ecological water-based HP Latex lines paired with heavy LED-UV hybrid rigid-and-roll printers. Compatible with wrap vinyls and flex banner substrates.",
    hardware: [
      {
        id: "hp-latex-r",
        brand: "HP",
        model: "Latex R Series Hybrid",
        origin: "USA / Spain",
        heads: "HP Thermal Printheads",
        defaultHeads: 12,
        maxWidth: "2.50 meters",
        widths: [1.63, 2.50],
        speed: 120,
        powerDraw: 8.5,
        basePrice: 115000,
        note: "Odor-free ecological prints for signboards on rigid board or soft roll substrates.",
        inkSystem: "HP Water-Based Latex Ink Suite",
        mediaSystem: "Mactac Signage Self-Adhesive Vinyl"
      }
    ],
    ink: {
      name: "HP water-based Eco-Latex Inks",
      brand: "HP",
      origin: "USA",
      type: "Water-based Latex Resin",
      headsOptimized: "HP Latex thermal heads",
      packaging: "3L / 5L Eco-Carton Ink Bags",
      properties: "Odorless print outputs (GreenGuard Gold certified), highly scratch-resistant elastic polymer film layer, outdoor longevity up to 5 years."
    },
    media: {
      name: "Mactac Graphics Wrap Vinyl",
      brand: "Mactac",
      origin: "Belgium",
      weight: "80 micron cast vinyl",
      widths: "1.37m, 1.52m widths",
      finishes: "High-gloss wrap clear finish",
      properties: "Bubble-free adhesive channels, high conformability, clean residue-free removal."
    }
  },
  {
    id: "wall-decor",
    image: "/machinery/page_8.jpeg",
    tag: "Sector 06",
    title: "Wall Covering & Home Décor",
    description: "Textured wallpaper suites and 3D sensory printing lines. Coordinated non-woven fiber rolls matched with high-relief UV-LED stamping machines.",
    hardware: [
      {
        id: "hp-latex-production",
        brand: "HP",
        model: "Latex Production Series",
        origin: "USA / Europe",
        heads: "HP Thermal Printheads",
        defaultHeads: 8,
        maxWidth: "1.63 meters",
        widths: [1.63],
        speed: 150,
        powerDraw: 9.5,
        basePrice: 65000,
        note: "Ideal for hotels, residential, and corporate odor-free washable wallpapers.",
        inkSystem: "HP Water-Based Latex Ink Suite",
        mediaSystem: "Premium Non-Woven Wallpaper Rolls"
      }
    ],
    ink: {
      name: "HP odorless Latex Wallcovering Inks",
      brand: "HP",
      origin: "USA",
      type: "Water-based Latex resin",
      headsOptimized: "HP Latex optimized",
      packaging: "3L Ink Bags",
      properties: "GreenGuard Gold and Ecologo certified, zero hazardous air pollutants, extremely washable, hospital safe."
    },
    media: {
      name: "Premium Non-Woven Wallpaper Rolls",
      brand: "EGYGRAFX Coordinated",
      origin: "Germany",
      weight: "150 gsm non-woven",
      widths: "1.07m, 1.62m widths",
      finishes: "Smooth Matte & Canvas textured finish",
      properties: "Breathable wall covering, fire-retardant (Class A), easy wet-strippable removal."
    }
  },
  {
    id: "outdoor-adv",
    image: "/machinery/page_9.jpeg",
    tag: "Sector 07",
    title: "Outdoor Advertising",
    description: "Industrial super-wide 5.3-meter giants. Double-sided simultaneous UV-LED roll-to-roll and heavy solvent engines built for high-throughput billboards and banners.",
    hardware: [
      {
        id: "jhf-uv-5m",
        brand: "JHF",
        model: "Roll-to-Roll UV 5.3m",
        origin: "China",
        heads: "Kyocera Piezo Heads",
        defaultHeads: 16,
        maxWidth: "5.30 meters",
        widths: [3.30, 5.30],
        speed: 320,
        powerDraw: 16.0,
        basePrice: 120000,
        note: "Heavy industrial print frame designed for round-the-clock billboard production.",
        inkSystem: "INKTEX UV Industrial Ink Suite",
        mediaSystem: "Coordinated Backlit Banner Rolls"
      }
    ],
    ink: {
      name: "INKTEX UV Industrial Ink Suite",
      brand: "INKTEX",
      origin: "South Korea",
      type: "UV LED Flexible Curing Ink (White + CMYK)",
      headsOptimized: "Kyocera Piezo optimized",
      packaging: "5L canisters",
      properties: "Instant UV cross-linking, zero volatile organic compounds, exceptional adhesion on flex banners, mesh, and tarpaulins."
    },
    media: {
      name: "Premium Backlit Flex Banner Rolls",
      brand: "EGYGRAFX Coordinated",
      origin: "Taiwan",
      weight: "440 gsm high-yarn banner",
      widths: "3.20m, 5.00m seamless widths",
      finishes: "Semi-gloss diffuse surface",
      properties: "Perfect light transmission, anti-wicking thread base, high tensile wind strength."
    }
  },
  {
    id: "packaging-labeling",
    image: "/machinery/page_10.jpeg",
    tag: "Sector 08",
    title: "Packaging & Labeling",
    description: "Industrial single-pass corrugated packaging systems and high-precision cardboard printing frames.",
    hardware: [
      {
        id: "jhf-cz2516",
        brand: "JHF",
        model: "CZ2516 Single-Pass",
        origin: "China",
        heads: "Industrial Piezo Array",
        defaultHeads: 24,
        maxWidth: "2.50 meters",
        widths: [2.50],
        speed: 1200,
        powerDraw: 45.0,
        basePrice: 165000,
        note: "High-speed single-pass stationary bar array printing up to 90 linear meters per minute.",
        inkSystem: "JHF Eco Water-based Pigment Ink",
        mediaSystem: "Corrugated Kraft Board Sheets"
      }
    ],
    ink: {
      name: "JHF Eco Water-based Pigment Ink",
      brand: "JHF",
      origin: "China",
      type: "Ecological water-based pigment fluid",
      headsOptimized: "CZ Single-pass array optimized",
      packaging: "20L Industrial Kegs",
      properties: "Zero odour (FDA food packaging compliant), instant drying, deep contrast text, high scratch resistance."
    },
    media: {
      name: "Corrugated Kraft Board Sheets",
      brand: "EGYGRAFX Coordinated",
      origin: "Egypt",
      weight: "Single/Double Wall E-Flute",
      widths: "2.5m x 1.6m sheets",
      finishes: "Kraft brown / Bleached white",
      properties: "Flat surface feeding calibration, minimal absorption curl, optimized fiber absorption."
    }
  },
  {
    id: "promotional-spec",
    image: "/machinery/page_11.jpeg",
    tag: "Sector 09",
    title: "Promotional Specialty",
    description: "Flatbed and cylindrical UV systems built for high-detail printing directly onto corporate gifts, flasks, and Cylinders.",
    hardware: [
      {
        id: "oric-cylindrical-uv",
        brand: "ORIC",
        model: "Rotary 360 UV Printer",
        origin: "China",
        heads: "Ricoh Gen5i Heads",
        defaultHeads: 4,
        maxWidth: "0.30 meters",
        widths: [0.30],
        speed: 55,
        powerDraw: 2.8,
        basePrice: 15000,
        note: "Direct rotary printing for corporate gifting, stainless steel flasks, and glasses.",
        inkSystem: "INKTEX UV Curing Premium Ink",
        mediaSystem: "Promotional Items & Cylinders"
      }
    ],
    ink: {
      name: "INKTEX UV Curing Premium Ink",
      brand: "INKTEX",
      origin: "South Korea",
      type: "UV-LED Curing Fluid (Rigid/Flexible)",
      headsOptimized: "Ricoh / Epson optimized",
      packaging: "1L Bottles",
      properties: "Ultra-fine detail reproduction, excellent cross-linking elasticity, white and varnish gloss layers."
    },
    media: {
      name: "Promotional Cylinders & Objects",
      brand: "Corporate Directory",
      origin: "Various",
      weight: "N/A",
      widths: "Up to 30cm item diameter",
      finishes: "Glass, metals, wood, plastics",
      properties: "Compatible with Oric rotary clamp systems and automatic visual item sensors."
    }
  }
];

const initialLeads = [
  { id: "ld_001", company: "Nour Textiles Ltd", contact: "Nour", sector: "Home Textile & Fast Fashion", setup: "DGI Poseidon (8 heads, 1.82m)", date: "2026-06-15", budget: "$100,000 - $250,000", status: "Active Staging Sync" },
  { id: "ld_002", company: "Al-Ahram Advertising", contact: "Eng. Hisham", sector: "Signage & Display", setup: "HP Latex R Series (12 heads, 2.5m)", date: "Immediate", budget: "$50,000 - $100,000", status: "Delivered via Resend" },
  { id: "ld_003", company: "Kamel Decor Heliopolis", contact: "Sara Kamel", sector: "Wall Covering & Home Décor", setup: "HP Latex Production (8 heads, 1.63m)", date: "2026-07-01", budget: "$50,000 - $100,000", status: "Callback Requested" },
  { id: "ld_004", company: "Mourad CAD Alexandria", contact: "Tarek Mourad", sector: "Hi-Tech Industrial CAD/CAM", setup: "GBOS Laser (2 heads, 2.5m)", date: "Immediate", budget: "Over $250,000", status: "Deal Closed / Completed" }
];

const initialSuppliers = [
  {
    id: "hp",
    name: "HP Large Format",
    origin: "USA",
    flag: "🇺🇸",
    category: "Latex Printers",
    website: "https://www.hp.com/emea_middle_east-en/printers/large-format/latex-production-series.html",
    note: "Industry leader in odorless, green-certified indoor and outdoor large-format prints."
  },
  {
    id: "gbos",
    name: "GBOS Laser & Knife Systems",
    origin: "Germany/China",
    flag: "🇩🇪",
    category: "Precision Cutters",
    website: "https://www.gboslaser.com/",
    note: "High-speed optical nesting cutting for automotive upholstery and genuine leather sheets."
  },
  {
    id: "jhf",
    name: "JHF Industrial Printers",
    origin: "China",
    flag: "🇨🇳",
    category: "UV & Packaging",
    website: "https://en.jhfprinter.com/",
    note: "Continuous heavy industrial frameworks designed for high-volume billboard and packaging production."
  },
  {
    id: "monti",
    name: "Monti Antonio",
    origin: "Italy",
    flag: "🇮🇹",
    category: "Thermal Calenders",
    website: "https://www.montiantonio.com/en",
    note: "The global benchmark in high-pile fabric heat transfers and vacuum oil calendering."
  },
  {
    id: "oric",
    name: "ORIC Systems",
    origin: "China",
    flag: "🇨🇳",
    category: "Dye-Sub & UV",
    website: "https://www.oric-systems.com/",
    note: "Flexible, high-efficiency roll-to-roll printers and rotary direct-to-object equipment."
  },
  {
    id: "boyin",
    name: "Boyin DTF Systems",
    origin: "China",
    flag: "🇨🇳",
    category: "Direct-to-Film",
    website: "https://www.boyindtg.com/digital-printing-machine/",
    note: "Innovative hybrid pigment print lines synced with automated inline powder curing conveyor ovens."
  },
  {
    id: "dpi",
    name: "DPI Dye-Sublimation",
    origin: "Taiwan",
    flag: "🇹🇼",
    category: "Fabric Printers",
    website: "https://dpi-t.com/index.php?c=show&id=749",
    note: "High-resolution multi-head dye sublimation structures engineered for continuous fast fashion runs."
  },
  {
    id: "lintor",
    name: "Lintor Calenders",
    origin: "China",
    flag: "🇨🇳",
    category: "Industrial Calenders",
    website: "http://www.lintor.com/index_en.php",
    note: "Heavy duty roll-to-roll fabric laminating machinery with advanced tension controllers."
  },
  {
    id: "mas",
    name: "MAS Italy",
    origin: "Italy",
    flag: "🇮🇹",
    category: "3D UV Flatbeds",
    website: "https://mas-italy.com/en",
    note: "Italian luxury flatbed UV systems creating tactile embossing, spot varnish, and cold foil embellishments."
  }
];

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState("portal");
  const [activeSectorId, setActiveSectorId] = useState("home-textile");
  const [database, setDatabase] = useState(initialDatabase);
  const [leads, setLeads] = useState(initialLeads);
  const [suppliers] = useState(initialSuppliers);
  const [securityLogs, setSecurityLogs] = useState(getInitialLogs);

  const addLead = (newLead) => {
    const formattedLead = {
      id: generateLeadId(),
      date: "Immediate",
      status: "Active Staging Sync",
      ...newLead
    };
    setLeads((prev) => [formattedLead, ...prev]);
    addSecurityLog(`Firestore leads registry sync pushed: ${formattedLead.company} (${formattedLead.contact})`);
  };

  const addSecurityLog = (message) => {
    setSecurityLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), message },
      ...prev.slice(0, 49) // Keep last 50 logs
    ]);
  };

  const updateEquipmentPrice = (hwId, newPrice) => {
    let hardwareModel = "";
    database.forEach((sector) => {
      const hw = sector.hardware.find((h) => h.id === hwId);
      if (hw) {
        hardwareModel = hw.model;
      }
    });

    setDatabase((prevDb) => {
      return prevDb.map((sector) => {
        const hardwareIndex = sector.hardware.findIndex((hw) => hw.id === hwId);
        if (hardwareIndex !== -1) {
          const updatedHardware = [...sector.hardware];
          updatedHardware[hardwareIndex] = {
            ...updatedHardware[hardwareIndex],
            basePrice: parseFloat(newPrice) || 0
          };
          return { ...sector, hardware: updatedHardware };
        }
        return sector;
      });
    });

    if (hardwareModel) {
      addSecurityLog(`CMS Price Update Pushed: ${hardwareModel} set to $${newPrice} USD`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeSectorId,
        setActiveSectorId,
        database,
        leads,
        suppliers,
        addLead,
        securityLogs,
        addSecurityLog,
        updateEquipmentPrice
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
