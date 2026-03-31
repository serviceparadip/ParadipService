import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Enquiry submitted successfully");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-20 bg-brandBlue text-white">
      <div className="section-shell grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-heading text-xl font-bold">ParadipService</h3>
          <p className="mt-3 text-sm text-sky-100">
            Fast and reliable home appliance repair service in Odisha and nearby regions.
          </p>
          <p className="mt-3 text-sm">Email: support@paradipservice.in</p>
          <p className="text-sm">Phone: +91 91234 56789</p>
        </div>

        <div>
          <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-sky-100">
            <li>Home</li>
            <li>Services</li>
            <li>AC Service</li>
            <li>Contact Us</li>
            <li>Book Now</li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-heading text-lg font-semibold">Send Your Enquiry</h4>
          <form onSubmit={onSubmit} className="mt-3 grid gap-3">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              required
              className="rounded-lg border border-skyBlue/40 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-sky-200"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              required
              className="rounded-lg border border-skyBlue/40 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-sky-200"
            />
            <textarea
              rows="3"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Message"
              required
              className="rounded-lg border border-skyBlue/40 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-sky-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-fit rounded-lg bg-mintGreen px-5 py-2 text-sm font-bold text-white hover:bg-deepGreen disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
