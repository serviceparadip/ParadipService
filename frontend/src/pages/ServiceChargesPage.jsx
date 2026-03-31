import { useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import SEO from "../components/SEO";
import { api } from "../services/api";

const ServiceChargesPage = () => {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data } = await api.get("/pricing");
        setPricing(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const grouped = useMemo(() => {
    return pricing.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [pricing]);

  return (
    <div className="section-shell py-14">
      <SEO title="Service Charges" description="Dynamic service pricing for AC, refrigerator and washing machine repairs." />
      <h1 className="font-heading text-4xl font-bold text-brandBlue">Service Charges</h1>
      <p className="mt-3 text-slate-700">Live pricing is fetched from backend and managed by admin panel.</p>

      {loading ? (
        <Loader />
      ) : (
        <div className="mt-8 space-y-8">
          {Object.entries(grouped).map(([category, items]) => (
            <section key={category} className="glass-card p-6">
              <h2 className="font-heading text-2xl font-semibold text-brandBlue">{category}</h2>
              <div className="mt-4 grid gap-3">
                {items.map((item) => (
                  <div key={item._id} className="rounded-xl border border-skyBlue/20 bg-white p-4">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                      <div>
                        <h3 className="font-semibold text-brandBlue">{item.serviceName}</h3>
                        <p className="text-sm text-slate-600">{item.description || "Service details"}</p>
                      </div>
                      <p className="font-heading text-lg font-bold text-mintGreen">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceChargesPage;
