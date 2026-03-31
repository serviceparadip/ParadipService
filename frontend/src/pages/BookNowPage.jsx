import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import { api } from "../services/api";

const initialState = {
  name: "",
  phone: "",
  applianceType: "",
  brand: "",
  model: "",
  tonnage: "",
  gasType: "",
  serviceType: "",
  address: "",
  date: "",
  time: "",
  description: ""
};

const acBrandOptions = [
  "Blue Star",
  "Mitsubishi",
  "Voltas",
  "Carrier",
  "Godrej",
  "O General",
  "Hitachi",
  "Samsung",
  "Lloyd",
  "Panasonic",
  "Daikin",
  "Onida"
];

const acServiceOptions = [
  "AC Repair and Service",
  "AC Installation",
  "AC Uninstallation",
  "AC Gas Filling",
  "AC Remote Repair",
  "AC Maintenance"
];

const acTonnageOptions = ["1 Ton", "1.5 Ton", "2 Ton"];
const acGasTypeOptions = ["R22", "R410"];

const applianceServiceMap = {
  ac: acServiceOptions,
  refrigerator: ["Refrigerator Repairing Service", "Refrigerator Gas Filling"],
  "washing machine": ["Washing Machine Repairing Service"],
  microwave: ["Microwave Oven Repairing"],
  geyser: ["Geyser Repair"]
};

const normalizeText = (value = "") => value.trim().toLowerCase();

const getServiceOptions = (applianceType = "") => {
  const normalizedAppliance = normalizeText(applianceType);
  if (!normalizedAppliance) return [];

  const matchedKey = Object.keys(applianceServiceMap).find((key) => normalizedAppliance.includes(key));
  return matchedKey ? applianceServiceMap[matchedKey] : [];
};

const BookNowPage = () => {
  const [searchParams] = useSearchParams();
  const prefilledApplianceType = searchParams.get("applianceType") || "";
  const prefilledServiceType = searchParams.get("serviceType") || "";
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [pricingRows, setPricingRows] = useState([]);
  const [pricingLoading, setPricingLoading] = useState(false);

  useEffect(() => {
    const applianceType = prefilledApplianceType;
    const serviceType = prefilledServiceType;
    if (!applianceType && !serviceType) return;

    setForm((prev) => ({
      ...prev,
      applianceType: applianceType || prev.applianceType,
      serviceType: serviceType || prev.serviceType
    }));
  }, [prefilledApplianceType, prefilledServiceType]);

  useEffect(() => {
    let isMounted = true;

    const loadPricing = async () => {
      setPricingLoading(true);
      try {
        const response = await api.get("/pricing");
        if (isMounted) {
          setPricingRows(response.data?.data || []);
        }
      } catch {
        if (isMounted) {
          setPricingRows([]);
        }
      } finally {
        if (isMounted) {
          setPricingLoading(false);
        }
      }
    };

    loadPricing();

    return () => {
      isMounted = false;
    };
  }, []);

  const isACBooking = normalizeText(form.applianceType).includes("ac");
  const isACGasService = isACBooking && normalizeText(form.serviceType).includes("gas");
  const isApplianceLocked = Boolean(prefilledApplianceType);
  const normalizedCategory = normalizeText(form.applianceType);
  const normalizedService = normalizeText(form.serviceType);
  const normalizedGasType = normalizeText(form.gasType);
  const normalizedTonnage = normalizeText(form.tonnage);
  const serviceOptions = getServiceOptions(form.applianceType);

  useEffect(() => {
    if (!serviceOptions.length) return;

    const hasMatch = serviceOptions.some(
      (option) => normalizeText(option) === normalizeText(form.serviceType)
    );

    if (!hasMatch) {
      setForm((prev) => ({ ...prev, serviceType: serviceOptions[0] }));
    }
  }, [form.applianceType]);

  const matchedPricing = pricingRows
    .filter((item) => {
      const category = normalizeText(item.category);
      const serviceName = normalizeText(item.serviceName);

      const categoryMatch = normalizedCategory
        ? category.includes(normalizedCategory) || normalizedCategory.includes(category)
        : false;

      if (!categoryMatch) {
        return false;
      }

      if (!normalizedService) {
        return true;
      }

      if (serviceName.includes(normalizedService) || normalizedService.includes(serviceName)) {
        return true;
      }

      if (normalizedService.includes("gas")) {
        if (!serviceName.includes("gas")) {
          return false;
        }

        if (normalizedGasType && !serviceName.includes(normalizedGasType)) {
          return false;
        }

        if (normalizedTonnage && !serviceName.includes(normalizedTonnage)) {
          return false;
        }

        return true;
      }

      if (normalizedService.includes("install")) {
        return serviceName.includes("install") || serviceName.includes("dismant");
      }

      if (normalizedService.includes("repair")) {
        return serviceName.includes("service") || serviceName.includes("visit") || serviceName.includes("repair");
      }

      return false;
    })
    .slice(0, 4);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((prev) => {
      const nextForm = {
        ...prev,
        [name]: value
      };

      if (name === "applianceType" && !normalizeText(value).includes("ac")) {
        nextForm.brand = "";
        nextForm.model = "";
        nextForm.tonnage = "";
        nextForm.gasType = "";
      }

      if (name === "serviceType" && !normalizeText(value).includes("gas")) {
        nextForm.gasType = "";
      }

      return nextForm;
    });
  };

  const validate = () => {
    if (!/^\d{10}$/.test(form.phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }

    if (isACBooking && (!form.brand.trim() || !form.model.trim())) {
      toast.error("Please enter AC brand and model");
      return false;
    }

    if (isACBooking && !form.tonnage.trim()) {
      toast.error("Please select AC tonnage");
      return false;
    }

    if (isACGasService && !form.gasType.trim()) {
      toast.error("Please select AC gas type");
      return false;
    }

    return true;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/bookings", form);
      toast.success("Booking submitted successfully");
      setForm({
        ...initialState,
        applianceType: prefilledApplianceType,
        serviceType: prefilledServiceType
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-shell py-14">
      <SEO title="Book Now" description="Book your appliance repair service online with ParadipService." />
      <h1 className="font-heading text-3xl font-bold text-brandBlue md:text-4xl">Book a Repair Service</h1>

      <form onSubmit={onSubmit} className="glass-card mt-8 grid gap-4 p-6 md:grid-cols-2">
        <input name="name" value={form.name} onChange={updateField} placeholder="Name" required className="rounded-lg border border-skyBlue/30 px-3 py-3" />
        <input name="phone" value={form.phone} onChange={updateField} placeholder="Contact No" required className="rounded-lg border border-skyBlue/30 px-3 py-3" />
        <input
          name="applianceType"
          value={form.applianceType}
          onChange={updateField}
          placeholder="Appliance Type"
          readOnly={isApplianceLocked}
          required
          className={`rounded-lg border border-skyBlue/30 px-3 py-3 ${isApplianceLocked ? "cursor-not-allowed bg-slate-100 text-slate-600" : ""}`}
        />
        {serviceOptions.length > 0 ? (
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={updateField}
            required
            className="rounded-lg border border-skyBlue/30 px-3 py-3"
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            name="serviceType"
            value={form.serviceType}
            onChange={updateField}
            placeholder="Service Type"
            required
            className="rounded-lg border border-skyBlue/30 px-3 py-3"
          />
        )}
        {isACBooking && (
          <>
            <select
              name="brand"
              value={form.brand}
              onChange={updateField}
              required
              className="rounded-lg border border-skyBlue/30 px-3 py-3"
            >
              <option value="">Select AC Brand</option>
              {acBrandOptions.map((brandOption) => (
                <option key={brandOption} value={brandOption}>
                  {brandOption}
                </option>
              ))}
            </select>
            <select
              name="tonnage"
              value={form.tonnage}
              onChange={updateField}
              required
              className="rounded-lg border border-skyBlue/30 px-3 py-3"
            >
              <option value="">Select AC Tonnage</option>
              {acTonnageOptions.map((tonnageOption) => (
                <option key={tonnageOption} value={tonnageOption}>
                  {tonnageOption}
                </option>
              ))}
            </select>
            <input
              name="model"
              value={form.model}
              onChange={updateField}
              placeholder="AC Model"
              required
              className="rounded-lg border border-skyBlue/30 px-3 py-3"
            />
            {isACGasService && (
              <select
                name="gasType"
                value={form.gasType}
                onChange={updateField}
                required
                className="rounded-lg border border-skyBlue/30 px-3 py-3"
              >
                <option value="">Select Gas Type</option>
                {acGasTypeOptions.map((gasOption) => (
                  <option key={gasOption} value={gasOption}>
                    {gasOption}
                  </option>
                ))}
              </select>
            )}
          </>
        )}
        <input name="address" value={form.address} onChange={updateField} placeholder="Address" required className="rounded-lg border border-skyBlue/30 px-3 py-3 md:col-span-2" />
        <input type="date" name="date" value={form.date} onChange={updateField} required className="rounded-lg border border-skyBlue/30 px-3 py-3" />
        <input type="time" name="time" value={form.time} onChange={updateField} required className="rounded-lg border border-skyBlue/30 px-3 py-3" />
        <textarea
          name="description"
          value={form.description}
          onChange={updateField}
          placeholder="Problem Description"
          className="rounded-lg border border-skyBlue/30 px-3 py-3 md:col-span-2"
          rows="4"
        />
        <div className="rounded-xl border border-skyBlue/30 bg-skyBlue/5 p-4 md:col-span-2">
          <p className="font-semibold text-brandBlue">Estimated Price</p>
          {pricingLoading && <p className="mt-1 text-sm text-slate-600">Loading price suggestions...</p>}
          {!pricingLoading && matchedPricing.length === 0 && (
            <p className="mt-1 text-sm text-slate-600">Select appliance and service to view matching charges.</p>
          )}
          {!pricingLoading && matchedPricing.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {matchedPricing.map((item) => (
                <li key={`${item.category}-${item.serviceName}`}>
                  {item.serviceName}: {item.price}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-mintGreen px-5 py-3 font-bold text-white hover:bg-deepGreen disabled:opacity-70 md:col-span-2"
        >
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookNowPage;
