import { Link, useParams } from "react-router-dom";
import SEO from "../components/SEO";

const CITY_DETAILS = {
  bhubaneswar: {
    label: "Bhubaneswar",
    summary: "Doorstep AC repair, installation, gas filling, and annual maintenance in all major areas of Bhubaneswar.",
    areas: ["Patia", "Khandagiri", "Nayapalli", "Chandrasekharpur", "Old Town"]
  },
  cuttack: {
    label: "Cuttack",
    summary: "Trusted AC and home appliance support across residential and commercial zones in Cuttack.",
    areas: ["Badambadi", "Madhupatna", "College Square", "Chauliaganj", "Tulsipur"]
  },
  paradeep: {
    label: "Paradeep",
    summary: "Fast technician visits for AC service and appliance repairs in Paradeep and nearby localities.",
    areas: ["Paradip Port", "Atharbanki", "Nuabazar", "Jhimani", "Nehru Bungalow"]
  }
};

const defaultCity = {
  label: "Odisha",
  summary: "Fast and reliable AC and appliance service support across Odisha with transparent pricing.",
  areas: ["Bhubaneswar", "Cuttack", "Paradeep"]
};

const CityServicePage = () => {
  const { citySlug } = useParams();
  const city = CITY_DETAILS[citySlug] || defaultCity;

  const services = [
    "AC Repair and Service",
    "AC Installation",
    "AC Gas Filling",
    "AC Uninstallation",
    "AC Annual Maintenance"
  ];

  return (
    <div className="section-shell py-10">
      <SEO
        title={`AC Service in ${city.label}`}
        description={`Book AC service in ${city.label}. Installation, gas filling, and repair by ParadipService.`}
      />

      <section className="rounded-2xl bg-gradient-to-br from-brandBlue to-skyBlue p-6 text-white md:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-white/80">City Service</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold md:text-4xl">AC Service in {city.label}</h1>
        <p className="mt-3 max-w-3xl text-base text-white/90 md:text-lg">{city.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/book-now?applianceType=AC&serviceType=AC%20Repair%20and%20Service" className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-brandBlue">
            Book AC Service
          </Link>
          <a href="tel:+919668274949" className="rounded-lg bg-mintGreen px-5 py-3 text-sm font-bold text-white">
            Call Now
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h2 className="font-heading text-2xl font-semibold text-brandBlue">Popular Services in {city.label}</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            {services.map((item) => (
              <li key={item} className="flex items-center justify-between rounded-lg border border-skyBlue/20 p-3">
                <span>{item}</span>
                <Link
                  to={`/book-now?applianceType=AC&serviceType=${encodeURIComponent(item)}`}
                  className="rounded bg-mintGreen px-3 py-1 text-xs font-bold text-white"
                >
                  Book
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-heading text-2xl font-semibold text-brandBlue">Service Coverage Areas</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {city.areas.map((area) => (
              <li key={area} className="rounded-lg bg-skyBlue/10 px-3 py-2 text-sm font-semibold text-brandBlue">
                {area}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-slate-600">
            Same-day slots available based on technician availability. Book early for priority dispatch.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CityServicePage;
