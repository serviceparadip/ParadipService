import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const serviceMenu = [
  { label: "Repair Services", to: "/services#repair-services" },
  { label: "AC Repair and Service", to: "/services#ac-repair-and-service" },
  { label: "Refrigerator Repairing Service", to: "/services#refrigerator-repairing-service" },
  { label: "Washing Machine Repairing Service", to: "/services#washing-machine-repairing-service" },
  { label: "Microwave Oven Repairing", to: "/services#microwave-oven-repairing" }
];

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((value) => !value)}
        className="rounded-md px-3 py-2 text-sm font-semibold text-brandBlue hover:bg-skyBlue/10"
      >
        {title}
      </button>
      <div
        className={`absolute left-0 top-full z-20 mt-1 min-w-64 rounded-xl border border-skyBlue/30 bg-white p-2 shadow-service transition ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={`block rounded-lg px-3 py-2 text-sm ${
              item.type === "heading"
                ? "font-semibold text-brandBlue hover:bg-skyBlue/10"
                : item.type === "subLink"
                  ? "pl-6 text-slate-700 hover:bg-skyBlue/10"
                  : "text-slate-700 hover:bg-skyBlue/10"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-skyBlue/20 bg-white/85 backdrop-blur-md">
      <div className="section-shell flex items-center justify-between py-3">
        <Link to="/" className="font-heading text-xl font-extrabold text-brandBlue">
          Paradip<span className="text-mintGreen">Service</span>
        </Link>

        <button
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg bg-skyBlue/10 px-3 py-2 text-sm font-semibold text-brandBlue md:hidden"
        >
          Menu
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className="rounded-md px-3 py-2 text-sm font-semibold text-brandBlue hover:bg-skyBlue/10">
            Home
          </NavLink>
          <Dropdown title="Services" items={serviceMenu} />
          <NavLink
            to="/service-charges"
            className="rounded-md px-3 py-2 text-sm font-semibold text-brandBlue hover:bg-skyBlue/10"
          >
            Service Charges
          </NavLink>
          <NavLink
            to="/contact"
            className="rounded-md px-3 py-2 text-sm font-semibold text-brandBlue hover:bg-skyBlue/10"
          >
            Contact Us
          </NavLink>
          <Link
            to="/book-now"
            className="rounded-xl bg-mintGreen px-4 py-2 text-sm font-bold text-white shadow hover:bg-deepGreen"
          >
            Book Now
          </Link>
        </nav>
      </div>

      {open && (
        <div className="section-shell flex flex-col gap-2 pb-4 md:hidden">
          <NavLink to="/" className="rounded-md bg-skyBlue/10 px-3 py-2 text-sm font-semibold text-brandBlue">
            Home
          </NavLink>
          <NavLink to="/services" className="rounded-md bg-skyBlue/10 px-3 py-2 text-sm font-semibold text-brandBlue">
            Services
          </NavLink>
          <NavLink
            to="/service-charges"
            className="rounded-md bg-skyBlue/10 px-3 py-2 text-sm font-semibold text-brandBlue"
          >
            Service Charges
          </NavLink>
          <NavLink to="/contact" className="rounded-md bg-skyBlue/10 px-3 py-2 text-sm font-semibold text-brandBlue">
            Contact Us
          </NavLink>
          <Link to="/book-now" className="rounded-md bg-mintGreen px-3 py-2 text-sm font-bold text-white">
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
