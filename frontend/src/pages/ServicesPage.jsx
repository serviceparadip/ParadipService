import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { api } from "../services/api";

const fallbackServices = [
  {
    id: "ac-repair-troubleshooting",
    title: "AC Repair & Troubleshooting",
    applianceType: "AC",
    serviceType: "AC Repair & Troubleshooting",
    copy: "Fast fixes for cooling, airflow and noise issues",
    icon: "REPAIR"
  },
  {
    id: "ac-installation-uninstallation",
    title: "AC Installation & Uninstallation",
    applianceType: "AC",
    serviceType: "AC Installation & Uninstallation",
    copy: "Safe setup and shift support for split and window AC",
    icon: "INSTALL"
  },
  {
    id: "ac-gas-refilling-leakage",
    title: "AC Gas Refilling & Leakage Repair",
    applianceType: "AC",
    serviceType: "AC Gas Refilling & Leakage Repair",
    copy: "Gas top-up and leak checks for stronger cooling output",
    icon: "GAS"
  },
  {
    id: "ac-compressor-pcb",
    title: "AC Compressor & PCB Repair",
    applianceType: "AC",
    serviceType: "AC Compressor & PCB Repair",
    copy: "Expert circuit and compressor repairs for smooth operation",
    icon: "PCB"
  },
  {
    id: "ac-coil-condenser-cleaning",
    title: "AC Coil & Condenser Cleaning",
    applianceType: "AC",
    serviceType: "AC Coil & Condenser Cleaning",
    copy: "Deep cleaning to improve cooling speed and performance",
    icon: "COIL"
  },
  {
    id: "ac-fan-motor-thermostat",
    title: "AC Fan Motor & Thermostat Repair",
    applianceType: "AC",
    serviceType: "AC Fan Motor & Thermostat Repair",
    copy: "Reliable restoration for airflow and temperature control",
    icon: "FAN"
  },
  {
    id: "ac-duct-vent-cleaning",
    title: "AC Duct & Vent Cleaning",
    applianceType: "AC",
    serviceType: "AC Duct & Vent Cleaning",
    copy: "Dust removal and duct hygiene for healthy airflow",
    icon: "DUCT"
  },
  {
    id: "ac-annual-maintenance",
    title: "AC Annual Maintenance Service",
    applianceType: "AC",
    serviceType: "AC Annual Maintenance Service",
    copy: "Regular servicing to reduce breakdowns and power loss",
    icon: "AMC"
  }
];

const applianceCards = [
  {
    id: "appliance-refrigerator",
    title: "Refrigerator Repair",
    copy: "Efficient cooling issue solutions",
    icon: "FRIDGE",
    applianceType: "Refrigerator",
    serviceType: "Refrigerator Repair"
  },
  {
    id: "appliance-washing-machine",
    title: "Washing Machine Repair",
    copy: "Efficient wash cycle restoration",
    icon: "WASH",
    applianceType: "Washing Machine",
    serviceType: "Washing Machine Repair"
  },
  {
    id: "appliance-geyser",
    title: "Geyser Repair",
    copy: "Reliable hot water fixes",
    icon: "GEYSER",
    applianceType: "Geyser",
    serviceType: "Geyser Repair"
  },
  {
    id: "appliance-microwave",
    title: "Microwave Oven Repair",
    copy: "Quick heating problem resolution",
    icon: "MICRO",
    applianceType: "Microwave",
    serviceType: "Microwave Oven Repair"
  }
];

const iconBySlug = {
  "ac-repair-service": "REPAIR",
  "refrigerator-repair": "FRIDGE",
  "washing-machine-repair": "WASH",
  "microwave-repair": "MICRO"
};

const parseNumericPrice = (value) => {
  const match = String(value || "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
};

const inferCategory = (title = "") => {
  const normalized = title.toLowerCase();
  if (normalized.includes("refrigerator") || normalized.includes("fridge")) {
    return "Refrigerator";
  }
  if (normalized.includes("washing")) {
    return "Washing Machine";
  }
  if (normalized.includes("microwave")) {
    return "Microwave";
  }
  return "AC";
};

const ServiceIcon = ({ type, className = "" }) => {
  const key = String(type || "")
    .toUpperCase()
    .replace(/\s+/g, "");

  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch (key) {
    case "REPAIR":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path {...common} d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2.5-.5-.5-2.5 2.2-2.2z" />
        </svg>
      );
    case "INSTALL":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path {...common} d="M12 3v12" />
          <path {...common} d="m8 11 4 4 4-4" />
          <rect {...common} x="4" y="17" width="16" height="4" rx="1" />
        </svg>
      );
    case "GAS":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="8" y="6" width="8" height="14" rx="2" />
          <path {...common} d="M10 6V4h4v2" />
          <path {...common} d="m12 11 1.5 2.5H10.5L12 16" />
        </svg>
      );
    case "PCB":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="6" y="6" width="12" height="12" rx="2" />
          <rect {...common} x="10" y="10" width="4" height="4" />
          <path {...common} d="M3 9h3M3 15h3M18 9h3M18 15h3M9 3v3M15 3v3M9 18v3M15 18v3" />
        </svg>
      );
    case "COIL":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path {...common} d="M7 7a3 3 0 1 1 0 6h-.5a2.5 2.5 0 1 0 0 5H17" />
          <path {...common} d="M17 17a3 3 0 1 1 0-6h.5a2.5 2.5 0 1 0 0-5H7" />
        </svg>
      );
    case "FAN":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <circle {...common} cx="12" cy="12" r="1.8" />
          <path {...common} d="M12 4.5c2 0 3.5 2.6 2.2 4.3-1.2 1.7-4.4.8-4.4-1.4 0-1.6.9-2.9 2.2-2.9z" />
          <path {...common} d="M19.5 12c0 2-2.6 3.5-4.3 2.2-1.7-1.2-.8-4.4 1.4-4.4 1.6 0 2.9.9 2.9 2.2z" />
          <path {...common} d="M12 19.5c-2 0-3.5-2.6-2.2-4.3 1.2-1.7 4.4-.8 4.4 1.4 0 1.6-.9 2.9-2.2 2.9z" />
          <path {...common} d="M4.5 12c0-2 2.6-3.5 4.3-2.2 1.7 1.2.8 4.4-1.4 4.4-1.6 0-2.9-.9-2.9-2.2z" />
        </svg>
      );
    case "DUCT":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="3" y="6" width="18" height="8" rx="2" />
          <path {...common} d="M7 14v4m5-4v6m5-6v4" />
          <path {...common} d="M6 20h2m4 0h2m4 0h2" />
        </svg>
      );
    case "AMC":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="4" y="5" width="16" height="15" rx="2" />
          <path {...common} d="M8 3v4m8-4v4M4 9h16" />
          <path {...common} d="m9.5 14 1.8 1.8 3.2-3.2" />
        </svg>
      );
    case "FRIDGE":
    case "REFRIGERATOR":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="6" y="3" width="12" height="18" rx="2" />
          <path {...common} d="M6 11h12" />
          <path {...common} d="M9 6v2M9 14v2" />
        </svg>
      );
    case "WASH":
    case "WASHINGMACHINE":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="4" y="3" width="16" height="18" rx="2" />
          <circle {...common} cx="12" cy="13" r="4" />
          <path {...common} d="M7 7h5m6 0h.01" />
        </svg>
      );
    case "GEYSER":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="7" y="3" width="10" height="18" rx="2" />
          <circle {...common} cx="12" cy="16" r="1.5" />
          <path {...common} d="M10 7h4" />
        </svg>
      );
    case "MICRO":
    case "MICROWAVE":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="3" y="6" width="18" height="12" rx="2" />
          <path {...common} d="M7 10h7m0 4H7" />
          <path {...common} d="M18 10v4" />
          <circle {...common} cx="18" cy="15.5" r="0.8" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect {...common} x="3" y="6" width="18" height="10" rx="2" />
          <path {...common} d="M8 11h8" />
          <path {...common} d="M6 18h12" />
        </svg>
      );
  }
};

const IconBadge = ({ type }) => (
  <div className="-mt-12 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/20 bg-[#23161d] text-white shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:rotate-3">
    <ServiceIcon type={type} className="h-10 w-10 transition duration-300 group-hover:-rotate-6 group-hover:scale-110" />
  </div>
);

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPrimaryCards, setShowPrimaryCards] = useState(false);
  const [showApplianceCards, setShowApplianceCards] = useState(false);
  const primaryGridRef = useRef(null);
  const applianceGridRef = useRef(null);

  useEffect(() => {
    let active = true;

    const loadServices = async () => {
      setIsLoading(true);
      try {
        const [serviceRes, pricingRes] = await Promise.all([api.get("/services"), api.get("/pricing")]);
        if (!active) {
          return;
        }
        setServices(Array.isArray(serviceRes.data) ? serviceRes.data : []);
        setPricing(Array.isArray(pricingRes.data) ? pricingRes.data : []);
      } catch (error) {
        if (!active) {
          return;
        }
        setServices([]);
        setPricing([]);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          if (entry.target === primaryGridRef.current) {
            setShowPrimaryCards(true);
            observer.unobserve(entry.target);
          }
          if (entry.target === applianceGridRef.current) {
            setShowApplianceCards(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15
      }
    );

    if (primaryGridRef.current) {
      observer.observe(primaryGridRef.current);
    }

    if (applianceGridRef.current) {
      observer.observe(applianceGridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = useMemo(() => {
    const source = services.length
      ? services.map((service) => ({
          id: service.slug,
          title: service.title,
          applianceType: inferCategory(service.title),
          serviceType: service.title,
          copy: service.description,
          icon: iconBySlug[service.slug] || inferCategory(service.title).toUpperCase(),
          category: inferCategory(service.title)
        }))
      : fallbackServices.map((service) => ({ ...service, category: inferCategory(service.title) }));

    return source;
  }, [services]);

  const categoryTabs = useMemo(() => {
    const categories = Array.from(new Set(cards.map((card) => card.category)));
    return ["All", ...categories];
  }, [cards]);

  const lowestPriceByCategory = useMemo(() => {
    const summary = {};
    pricing.forEach((item) => {
      const value = parseNumericPrice(item.price);
      if (value == null) {
        return;
      }
      const category = item.category;
      summary[category] = summary[category] == null ? value : Math.min(summary[category], value);
    });
    return summary;
  }, [pricing]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const categoryMatch = activeCategory === "All" ? true : card.category === activeCategory;
      const text = `${card.title} ${card.copy}`.toLowerCase();
      const searchMatch = searchText.trim() ? text.includes(searchText.trim().toLowerCase()) : true;
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, cards, searchText]);

  return (
    <div className="section-shell py-12 md:py-14">
      <SEO title="Services" description="ParadipService repair services for AC, fridge, washing machine and microwave." />
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10">
        <p className="text-sm font-bold uppercase tracking-wide text-[#eb5f6a]">Our Expertise</p>
        <h1 id="repair-services" className="scroll-mt-28 mt-2 font-heading text-3xl font-extrabold text-[#1f1b2b] md:text-4xl">
          Reliable Repairs & Maintenance for a Hassle-Free Home
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-700 md:text-lg">
          We provide expert AC repair and maintenance support for homes and offices in Odisha. From installation and
          gas filling to compressor, PCB, fan motor, and duct cleaning, our technicians deliver prompt and dependable
          service at your doorstep.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="sr-only">Search services</span>
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search service by name or need"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-[#0a6fbe] focus:ring-2 focus:ring-[#0a6fbe]/20"
            />
          </label>
          <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
            Showing {filteredCards.length} service{filteredCards.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCategory(tab)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeCategory === tab
                  ? "bg-[#0a6fbe] text-white shadow"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-[#0a6fbe]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section ref={primaryGridRef} className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <article key={`skeleton-${index}`} className="animate-pulse rounded-2xl bg-slate-200 px-5 pb-6 pt-0" />
            ))
          : filteredCards.map((item, index) => (
          <article
            id={item.id}
            key={item.id}
            style={{ transitionDelay: `${index * 70}ms` }}
            className={`group scroll-mt-28 rounded-2xl bg-gradient-to-br from-[#f06d7a] via-[#e05f72] to-[#cf4f66] px-5 pb-6 pt-0 text-center text-white shadow-lg transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl ${
              showPrimaryCards ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <IconBadge type={item.icon} />
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-snug transition duration-300 group-hover:tracking-wide">{item.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-white/95">{item.copy}</p>
            <p className="mt-2 text-sm font-semibold text-white/85">
              {lowestPriceByCategory[item.category] ? `Starting from INR ${lowestPriceByCategory[item.category]}` : "Price on request"}
            </p>
            <Link
              to={`/book-now?applianceType=${encodeURIComponent(item.applianceType)}&serviceType=${encodeURIComponent(item.serviceType)}`}
              className="mt-5 inline-flex rounded-lg bg-white px-7 py-3 text-lg font-bold text-[#1f1b2b] transition duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              Book Now
            </Link>
          </article>
            ))}
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
        <h2 className="font-heading text-3xl font-extrabold text-[#1f1b2b] md:text-4xl">Home Appliance Services</h2>
        <p className="mt-2 text-base text-slate-700 md:text-lg">
          Doorstep support for major appliances with quick booking and transparent service.
        </p>

        <div ref={applianceGridRef} className="mt-6 grid gap-5 md:grid-cols-2">
          {applianceCards.map((item, index) => (
            <article
              key={item.id}
              style={{ transitionDelay: `${index * 90}ms` }}
              className={`group grid overflow-hidden rounded-2xl shadow-md transition-all duration-700 hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[160px_1fr] ${
                showApplianceCards ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="flex min-h-[160px] items-center justify-center bg-[#f4f4f5] p-4 text-[#23161d] transition duration-300 group-hover:bg-white">
                <ServiceIcon type={item.icon} className="h-24 w-24 transition duration-300 group-hover:scale-105 group-hover:-rotate-2" />
              </div>
              <div className="bg-[#23161d] p-6 text-white">
                <h3 className="font-heading text-3xl font-extrabold leading-tight transition duration-300 group-hover:tracking-wide">{item.title}</h3>
                <p className="mt-2 text-lg text-white/90">{item.copy}</p>
                <Link
                  to={`/book-now?applianceType=${encodeURIComponent(item.applianceType)}&serviceType=${encodeURIComponent(item.serviceType)}`}
                  className="mt-5 inline-flex rounded-lg bg-[#eb5f6a] px-7 py-3 text-xl font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#dd5060]"
                >
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-[#23161d] p-7 text-white">
          <h3 className="font-heading text-4xl font-extrabold">Why Choose ParadipService?</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-white/95">
            <li>Experienced and certified technicians for all major AC brands.</li>
            <li>Genuine spare parts and transparent pricing on every job.</li>
            <li>Fast response across Bhubaneswar, Cuttack, and nearby areas.</li>
            <li>Trusted local service with high customer satisfaction.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-[#eb5f6a] p-7 text-white">
          <h3 className="font-heading text-4xl font-extrabold">Contact</h3>
          <p className="mt-3 text-lg leading-relaxed text-white/95">
            Ready to book hassle-free service? Reach us on call or WhatsApp for quick scheduling.
          </p>
          <h4 className="mt-5 font-heading text-3xl font-extrabold">Service Areas</h4>
          <p className="mt-2 text-lg leading-relaxed text-white/95">
            Bhubaneswar, Cuttack and nearby Odisha locations.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/city/bhubaneswar" className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white hover:bg-white/30">
              Bhubaneswar
            </Link>
            <Link to="/city/cuttack" className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white hover:bg-white/30">
              Cuttack
            </Link>
            <Link to="/city/paradeep" className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white hover:bg-white/30">
              Paradeep
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/book-now"
              className="inline-flex rounded-lg bg-white px-7 py-3 text-lg font-bold text-[#1f1b2b] hover:bg-slate-100"
            >
              Book Now
            </Link>
            <a
              href="tel:+919668274949"
              className="inline-flex rounded-lg bg-[#23161d] px-7 py-3 text-lg font-bold text-white hover:bg-black"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
