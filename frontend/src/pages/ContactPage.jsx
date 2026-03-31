import { useState } from "react";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import { api } from "../services/api";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-shell py-14">
      <SEO title="Contact Us" description="Contact ParadipService for appliance repair in Odisha." />
      <h1 className="font-heading text-4xl font-bold text-brandBlue">Contact Us</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form onSubmit={submit} className="glass-card grid gap-4 p-6">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="rounded-lg border border-skyBlue/30 px-3 py-3"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded-lg border border-skyBlue/30 px-3 py-3"
          />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows="5"
            className="rounded-lg border border-skyBlue/30 px-3 py-3"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-mintGreen px-5 py-3 font-bold text-white hover:bg-deepGreen disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="glass-card p-6">
          <h2 className="font-heading text-2xl font-semibold text-brandBlue">Reach Us</h2>
          <p className="mt-3 text-slate-700">Phone: +91 91234 56789</p>
          <p className="text-slate-700">Email: support@paradipservice.in</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-skyBlue/20">
            <iframe
              title="Paradip Location"
              src="https://maps.google.com/maps?q=Paradip%2C%20Odisha&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="260"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
