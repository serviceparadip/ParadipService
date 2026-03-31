import { useEffect, useMemo, useState } from "react";
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

const IconBadge = ({ label }) => (
  <div className="-mt-12 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-white/20 bg-[#23161d] text-xs font-extrabold tracking-wide text-white shadow-lg">
    {label}
  </div>
);

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

      <section className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <article key={`skeleton-${index}`} className="animate-pulse rounded-2xl bg-slate-200 px-5 pb-6 pt-0" />
            ))
          : filteredCards.map((item) => (
          <article
            id={item.id}
            key={item.id}
            className="scroll-mt-28 rounded-2xl bg-gradient-to-br from-[#f06d7a] via-[#e05f72] to-[#cf4f66] px-5 pb-6 pt-0 text-center text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <IconBadge label={item.icon} />
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-snug">{item.title}</h2>
            <p className="mt-3 text-lg leading-relaxed text-white/95">{item.copy}</p>
            <p className="mt-2 text-sm font-semibold text-white/85">
              {lowestPriceByCategory[item.category] ? `Starting from INR ${lowestPriceByCategory[item.category]}` : "Price on request"}
            </p>
            <Link
              to={`/book-now?applianceType=${encodeURIComponent(item.applianceType)}&serviceType=${encodeURIComponent(item.serviceType)}`}
              className="mt-5 inline-flex rounded-lg bg-white px-7 py-3 text-lg font-bold text-[#1f1b2b] transition hover:bg-slate-100"
            >
              Book Now
            </Link>
          </article>
            ))}
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
