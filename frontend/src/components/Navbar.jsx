import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("site-theme") || "ocean");
  const [statusIndex, setStatusIndex] = useState(0);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const [activePath, setActivePath] = useState(location.pathname);
  const desktopNavRef = useRef(null);
  const navRefs = useRef({});
  const mobileMenuRef = useRef(null);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Service" },
    { to: "/service-charges", label: "Service Charges" },
    { to: "/contact", label: "Contact Us" },
  ];

  const getServiceStatus = () => {
    const indiaNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const hour = indiaNow.getHours();
    const isOpen = hour >= 8 && hour < 21;
    return isOpen ? "Open now till 9:00 PM" : "Closed now, opens at 8:00 AM";
  };

  const utilityMessages = [
    getServiceStatus(),
    "Same-day AC service slots available",
    "Call support: +91 9668274949",
  ];

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatusIndex((value) => (value + 1) % utilityMessages.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, [utilityMessages.length]);

  useEffect(() => {
    const exactMatch = navItems.find((item) => item.to === location.pathname);
    if (exactMatch) {
      setActivePath(exactMatch.to);
      return;
    }

    if (location.pathname.startsWith("/city/")) {
      setActivePath("/services");
      return;
    }

    setActivePath("");
  }, [location.pathname]);

  useEffect(() => {
    const updateIndicator = () => {
      const container = desktopNavRef.current;
      const activeNode = navRefs.current[activePath];

      if (!container || !activeNode) {
        setActiveIndicator({ left: 0, width: 0 });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeNode.getBoundingClientRect();
      setActiveIndicator({
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activePath]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-skyBlue/25 bg-white/90 shadow-[0_10px_30px_-20px_rgba(11,79,138,0.6)] backdrop-blur-md"
          : "border-b border-skyBlue/15 bg-white/80 backdrop-blur"
      }`}
    >
      <div className="border-b border-skyBlue/15 bg-brandBlue/95 text-white">
        <div className="section-shell flex h-8 items-center justify-between gap-3 text-xs font-semibold">
          <div className="relative h-4 flex-1 overflow-hidden">
            {utilityMessages.map((message, index) => (
              <p
                key={message}
                className={`absolute left-0 top-0 whitespace-nowrap transition-all duration-500 ${
                  index === statusIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {message}
              </p>
            ))}
          </div>
          <button
            onClick={() => setTheme((value) => (value === "ocean" ? "slate" : "ocean"))}
            className="rounded-md border border-white/30 px-2 py-1 text-[11px] font-bold uppercase tracking-wide transition hover:bg-white/10"
          >
            {theme === "ocean" ? "Slate" : "Ocean"} Theme
          </button>
        </div>
      </div>

      <div className={`section-shell flex items-center justify-between transition-all duration-300 ${scrolled ? "py-2.5" : "py-3.5"}`}>
        <Link to="/" className="group font-heading text-xl font-extrabold text-brandBlue">
          Paradip<span className="text-mintGreen">Service</span>
          <span className="mt-0.5 block h-0.5 w-0 bg-gradient-to-r from-brandBlue to-mintGreen transition-all duration-300 group-hover:w-full" />
        </Link>

        <button
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="rounded-xl border border-skyBlue/25 bg-white px-3 py-2 text-sm font-semibold text-brandBlue shadow-sm transition hover:bg-skyBlue/10 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav ref={desktopNavRef} className="relative hidden items-center gap-1 rounded-xl bg-skyBlue/10 p-1 md:flex">
          <span
            className="pointer-events-none absolute bottom-1 top-1 rounded-lg bg-brandBlue shadow-sm transition-all duration-300"
            style={{
              transform: `translateX(${activeIndicator.left}px)`,
              width: `${activeIndicator.width}px`,
              opacity: activeIndicator.width ? 1 : 0,
            }}
          />
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              ref={(node) => {
                navRefs.current[item.to] = node;
              }}
              className={({ isActive }) =>
                `relative z-10 rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive || activePath === item.to
                    ? "text-white"
                    : "text-brandBlue hover:-translate-y-0.5"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/book-now"
            className="relative z-10 ml-1 rounded-xl bg-gradient-to-r from-mintGreen to-deepGreen px-4 py-2 text-sm font-bold text-white shadow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book Now
          </Link>
        </nav>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="absolute inset-x-0 top-full h-screen bg-black/20 backdrop-blur-[1px]" />
          <div ref={mobileMenuRef} className="section-shell relative pb-4">
            <div className="mt-2 rounded-2xl border border-skyBlue/20 bg-white p-2 shadow-xl">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `mb-1 block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive ? "bg-brandBlue text-white" : "bg-skyBlue/10 text-brandBlue hover:bg-skyBlue/20"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/book-now"
                className="mt-1 block rounded-xl bg-gradient-to-r from-mintGreen to-deepGreen px-3 py-2.5 text-center text-sm font-bold text-white"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
