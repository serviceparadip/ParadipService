import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { api } from "../services/api";

const defaultHeroSlides = [
  {
    heading: "AIR CONDITIONER ON RENT SERVICE",
    subText: "No Need to Buy - Rent Air Conditioners at the Best Price in Bhubaneswar",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Book Now",
    ctaLink: "/book-now"
  },
  {
    heading: "AC REPAIR AND INSTALLATION EXPERTS",
    subText: "Fast doorstep service for AC, Refrigerator, Washing Machine and Microwave",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Book Now",
    ctaLink: "/book-now"
  },
  {
    heading: "TRUSTED SERVICE ACROSS ODISHA",
    subText: "Certified technicians, transparent pricing, and genuine spare parts",
    image:
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Book Now",
    ctaLink: "/book-now"
  }
];

const defaultTestimonials = [
  {
    name: "Rakesh Nayak",
    role: "Homeowner",
    quote: "Booked AC servicing in the morning and technician arrived the same day. Great experience and fair pricing.",
    rating: 5,
    location: "Bhubaneswar"
  },
  {
    name: "Smita Das",
    role: "Working Professional",
    quote: "My refrigerator issue was fixed quickly and the team explained every step clearly. Highly recommended.",
    rating: 5,
    location: "Cuttack"
  },
  {
    name: "Arun Behera",
    role: "Restaurant Owner",
    quote: "Reliable support for regular maintenance and emergency repairs. Responsive team and professional work.",
    rating: 4,
    location: "Paradip"
  }
];

const parseNumericPrice = (value) => {
  const match = String(value || "").match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : null;
};

const HomePage = () => {
  const [slide, setSlide] = useState(0);
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const resolvedHeroSlides = useMemo(
    () => (heroSlides.length ? heroSlides : defaultHeroSlides),
    [heroSlides]
  );
  const resolvedTestimonials = useMemo(
    () => (testimonials.length ? testimonials : defaultTestimonials),
    [testimonials]
  );
  const activeSlide = useMemo(
    () => resolvedHeroSlides[slide] || resolvedHeroSlides[0],
    [resolvedHeroSlides, slide]
  );
  const popularServices = useMemo(() => services.slice(0, 4), [services]);

  const minQuotedPrice = useMemo(() => {
    const parsed = pricing.map((item) => parseNumericPrice(item.price)).filter((value) => value != null);
    if (!parsed.length) {
      return null;
    }
    return Math.min(...parsed);
  }, [pricing]);

  const onPrev = () => {
    setSlide((value) => (value === 0 ? resolvedHeroSlides.length - 1 : value - 1));
  };

  const onNext = () => {
    setSlide((value) => (value === resolvedHeroSlides.length - 1 ? 0 : value + 1));
  };

  useEffect(() => {
    if (slide >= resolvedHeroSlides.length) {
      setSlide(0);
    }
  }, [resolvedHeroSlides.length, slide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((value) => (value === resolvedHeroSlides.length - 1 ? 0 : value + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [resolvedHeroSlides.length]);

  useEffect(() => {
    let active = true;

    const loadDynamicData = async () => {
      try {
        const [serviceRes, pricingRes, heroRes, testimonialRes] = await Promise.all([
          api.get("/services"),
          api.get("/pricing"),
          api.get("/hero-slides"),
          api.get("/testimonials")
        ]);

        if (!active) {
          return;
        }

        setServices(Array.isArray(serviceRes.data) ? serviceRes.data : []);
        setPricing(Array.isArray(pricingRes.data) ? pricingRes.data : []);
        setHeroSlides(Array.isArray(heroRes.data) ? heroRes.data : []);
        setTestimonials(Array.isArray(testimonialRes.data) ? testimonialRes.data : []);
      } catch (error) {
        if (!active) {
          return;
        }
        setServices([]);
        setPricing([]);
        setHeroSlides([]);
        setTestimonials([]);
      }
    };

    loadDynamicData();

    return () => {
      active = false;
    };
  }, []);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null || touchStartY.current == null) {
      return;
    }

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = touchStartX.current - endX;
    const deltaY = touchStartY.current - endY;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX > 0) {
      onNext();
      return;
    }

    onPrev();
  };

  return (
    <>
      <SEO
        title="Expert Appliance Repair"
        description="TV, AC, Fridge, Washing Machine and Microwave repair at affordable prices in Odisha."
      />

      <section className="relative border-b border-slate-200/80 bg-white">
        <div
          className="relative h-[540px] bg-cover bg-center"
          style={{ backgroundImage: `url('${activeSlide.image}')` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/35" />

          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 px-4 py-2 text-3xl text-white hover:bg-white/45"
            aria-label="Previous slide"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 px-4 py-2 text-3xl text-white hover:bg-white/45"
            aria-label="Next slide"
          >
            &#8250;
          </button>

          <div className="section-shell relative z-10 flex h-full items-center justify-end pb-12 pt-14">
            <div className="w-full max-w-3xl rounded-2xl bg-black/35 p-6 text-white backdrop-blur-sm md:p-8">
              <h1 className="font-heading text-4xl font-extrabold uppercase leading-tight text-[#ff5f6d] md:text-6xl">
                {activeSlide.heading}
              </h1>
              <p className="mt-4 text-lg text-slate-100 md:text-3xl">{activeSlide.subText}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {popularServices.map((service) => (
                  <span
                    key={service._id || service.slug || service.title}
                    className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-sm font-semibold text-white"
                  >
                    {service.title}
                  </span>
                ))}
              </div>
              <Link
                to={activeSlide.ctaLink || "/book-now"}
                className="mt-7 inline-flex rounded-lg bg-[#24151c] px-8 py-3 text-xl font-bold text-white transition hover:bg-black"
              >
                {activeSlide.ctaText || "Book Now"}
              </Link>
              {minQuotedPrice ? (
                <p className="mt-3 text-sm font-semibold text-emerald-200">
                  Service pricing starts from INR {minQuotedPrice}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80"
              alt="Technician servicing AC unit"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-base font-bold text-[#eb5f6a]">About</p>
            <h2 className="mt-2 font-heading text-4xl font-extrabold text-[#1f1b2b]">
              Restore AC Service - Trusted Experts you Rely on
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              Are you searching for professional AC repair in Bhubaneswar? ParadipService is your trusted appliance
              repair provider, delivering expert AC repair, AC installation, and maintenance at your doorstep.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">
              With 12+ years of experience, we specialize in residential and commercial service with quick response,
              genuine spare parts, and transparent pricing across Odisha.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-[#f6eaee] p-4">
                <p className="font-heading text-5xl font-extrabold text-[#eb5f6a]">12+</p>
                <p className="mt-1 text-2xl font-semibold text-[#534a5f]">Years Experience</p>
              </div>
              <div className="rounded-xl bg-[#f6eaee] p-4">
                <p className="font-heading text-5xl font-extrabold text-[#eb5f6a]">{services.length || 4}</p>
                <p className="mt-1 text-2xl font-semibold text-[#534a5f]">Active Services</p>
              </div>
              <div className="rounded-xl bg-[#f6eaee] p-4">
                <p className="font-heading text-5xl font-extrabold text-[#eb5f6a]">{pricing.length || 25}</p>
                <p className="mt-1 text-2xl font-semibold text-[#534a5f]">Pricing Entries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10">
          <p className="text-base font-bold text-[#eb5f6a]">Testimonials</p>
          <h2 className="mt-2 font-heading text-4xl font-extrabold text-[#1f1b2b]">
            What Customers Say About ParadipService
          </h2>
          <p className="mt-3 text-lg text-slate-700">
            Real experiences from homes and businesses we serve across Odisha.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resolvedTestimonials.map((item, index) => (
            <article key={item._id || `${item.name}-${index}`} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="text-lg font-bold tracking-wide text-amber-500">
                {"★".repeat(Math.max(1, Math.min(5, Number(item.rating) || 5)))}
              </div>
              <p className="mt-3 text-lg leading-relaxed text-slate-700">"{item.quote}"</p>
              <div className="mt-5 border-t border-slate-200 pt-4">
                <p className="font-heading text-2xl font-bold text-[#1f1b2b]">{item.name}</p>
                <p className="text-base font-semibold text-slate-500">
                  {item.role}
                  {item.location ? ` - ${item.location}` : ""}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16 pt-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#23161d] p-8 text-white">
            <h3 className="font-heading text-5xl font-extrabold">Why Choose ParadipService?</h3>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-2xl leading-relaxed text-white/95">
              <li>Experienced and Certified Technicians for all AC brands.</li>
              <li>Genuine spare parts with transparent and competitive pricing.</li>
              <li>Rapid response across Bhubaneswar, Cuttack and nearby areas.</li>
              <li>Trusted support with strong customer satisfaction.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#eb5f6a] p-8 text-white">
            <h3 className="font-heading text-5xl font-extrabold">Contact</h3>
            <p className="mt-3 text-2xl leading-relaxed text-white/95">
              Ready to experience hassle-free AC services? Book online now or call us directly at 9668274949.
            </p>
            <h4 className="mt-5 font-heading text-4xl font-extrabold">Service Areas</h4>
            <p className="mt-2 text-2xl leading-relaxed text-white/95">
              We proudly serve residential and commercial clients in Bhubaneswar, Cuttack and nearby Odisha regions.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/book-now"
                className="inline-flex rounded-lg bg-white px-8 py-3 text-xl font-bold text-[#1f1b2b] hover:bg-slate-100"
              >
                Book Now
              </Link>
              <a
                href="tel:+919668274949"
                className="inline-flex rounded-lg bg-[#23161d] px-8 py-3 text-xl font-bold text-white hover:bg-black"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
