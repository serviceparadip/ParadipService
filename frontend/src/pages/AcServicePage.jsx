import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const acItems = [
  { id: "ac-installation", title: "AC Installation" },
  { id: "ac-gas-filling", title: "AC Gas Filling" },
  { id: "ac-remote-repair", title: "AC Remote Repair" },
  { id: "ac-brands-we-serve", title: "AC Brands We Serve" }
];

const acBrands = [
  "Blue Star AC Service",
  "Mitsubishi AC Service",
  "Voltas AC Service",
  "Carrier AC Service",
  "Godrej AC Service",
  "O General AC Service",
  "Hitachi AC Service",
  "Samsung AC Service",
  "Lloyd AC Service",
  "Panasonic AC Service",
  "Daikin AC Service",
  "Onida AC Service"
];

const acInstallationGuide = {
  intro: [
    "Odisha Repair Service Centre offers AC Service in Bhubaneswar. Book online for air conditioning repair, AC installation in Bhubaneswar, and AC gas filling in Bhubaneswar. Call Now: 9979592479.",
    "With weather changes becoming more extreme, AC systems are now a practical need for homes and offices, not just a luxury.",
    "Before purchasing or installing a new AC, it is important to plan room size, installation location, airflow direction, and long-term maintenance cost."
  ],
  beforeBuying: [
    "Choose the installation location first. Window AC units work well where a suitable window opening is available, while split AC is better for rooms without windows.",
    "Plan indoor airflow direction to avoid cool air escaping through doors and windows.",
    "Check external unit placement area for split AC to ensure safe installation and low vibration.",
    "Select a design and color that blends with interiors, and consider smart features like Wi-Fi control and automation.",
    "For bedroom and study use, prioritize low-noise split AC systems over high-noise window units."
  ],
  brandFactors: [
    "Do not choose a brand only by popularity. Evaluate service quality and maintenance response in Bhubaneswar.",
    "Compare introductory machine cost, spare parts cost, annual support cost, and local service availability.",
    "Pick brands that provide strong warranty support for compressor and electronics."
  ],
  acTypes: [
    "Window Air Conditioner Installation: Single unit format, usually requires dedicated wall or window space. Better for compact rooms.",
    "Split Air Conditioner Installation: Indoor and outdoor units with lower noise and better flexibility for modern homes.",
    "High-Speed AC Systems: Useful for compact, older, or retrofit homes where conventional ducting is difficult."
  ],
  costGuide: [
    "AC Machine Cost: Depends on brand, tonnage, and season.",
    "AC Installation Cost: Usually around Rs. 2000 in many cases, excluding extra materials.",
    "Copper Pipe/Wire Cost: Extra runs may be charged separately (commonly around Rs. 200 per foot plus fittings).",
    "AC Servicing Cost: Varies by model and issue; major compressor replacement may cost Rs. 8000 or more after warranty."
  ],
  maintenance: [
    "Regular maintenance improves cooling efficiency, lowers power consumption, and reduces sudden breakdowns.",
    "Keep air vents open and unobstructed by curtains, furniture, and storage items.",
    "Clean or replace blower filters frequently to maintain airflow and indoor air quality.",
    "Flush condensate drain line periodically to avoid algae, mold, and water leakage issues.",
    "Clean outdoor condenser unit and level the base annually for reliable performance.",
    "Clean evaporator coils to prevent dust buildup that reduces cooling capacity.",
    "Always switch off power before service or repair work to avoid electrical risk."
  ],
  installationTips: [
    "AC installation is not a DIY job. Proper sizing, piping, vacuuming, and electrical safety require trained technicians.",
    "Wrong-sized AC causes poor comfort, high bills, and frequent compressor stress.",
    "Energy-efficient systems with higher ratings can reduce monthly electricity expenses.",
    "Programmable thermostats help maintain comfort and optimize cooling cycles automatically.",
    "Average AC life is about 10 to 15 years; frequent repairs and poor cooling are signs to replace the unit."
  ]
};

const AcServicePage = () => {
  return (
    <div className="section-shell py-14">
      <SEO title="AC Service" description="AC installation, gas filling, remote repair and brand support." />
      <h1 className="font-heading text-3xl font-bold text-brandBlue md:text-4xl">AC Service</h1>
      <p className="mt-3 text-sm text-slate-700 md:text-base">Complete AC service solutions in Paradip and nearby Odisha regions.</p>
      <Link
        to="/book-now?applianceType=AC"
        className="mt-5 inline-flex w-full justify-center rounded-xl bg-mintGreen px-5 py-3 text-sm font-bold text-white shadow hover:bg-deepGreen sm:w-auto"
      >
        Book AC Service Now
      </Link>

      <div className="mt-6 grid gap-4 md:mt-8 md:gap-5 md:grid-cols-2">
        {acItems.map((item) => (
          <section id={item.id} key={item.id} className="glass-card scroll-mt-28 p-5 md:p-6">
            <h2 className="font-heading text-xl font-semibold text-brandBlue md:text-2xl">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Expert technicians with genuine parts and transparent pricing.
            </p>

            {item.id === "ac-installation" && (
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-700 md:leading-7">
                {acInstallationGuide.intro.map((line) => (
                  <p key={line}>{line}</p>
                ))}

                <div>
                  <h3 className="font-heading text-lg font-semibold text-brandBlue">
                    Things To Remember Before Buying Air Conditioner In Bhubaneswar
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {acInstallationGuide.beforeBuying.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-brandBlue">Brand Choice</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {acInstallationGuide.brandFactors.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-brandBlue">Kinds Of Air Conditioners</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {acInstallationGuide.acTypes.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-brandBlue">Cost Breakdown</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {acInstallationGuide.costGuide.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-brandBlue">Maintenance For Efficient AC Performance</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {acInstallationGuide.maintenance.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-brandBlue">Professional Installation Advice</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {acInstallationGuide.installationTips.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>

                <p className="rounded-lg bg-brandBlue/10 px-4 py-3 font-semibold text-brandBlue">
                  AC Repair & Installation Service in Bhubaneswar, Odisha. AC, Refrigerator, Washing Machine & Microwave Service Centre Near You.
                </p>
              </div>
            )}

            {item.id === "ac-brands-we-serve" && (
              <div className="mt-4 grid gap-2">
                {acBrands.map((brand) => (
                  <p
                    key={brand}
                    id={brand.toLowerCase().replace(/\s+/g, "-")}
                    className="rounded-lg bg-skyBlue/10 px-3 py-2 text-slate-700"
                  >
                    {brand}
                  </p>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default AcServicePage;
