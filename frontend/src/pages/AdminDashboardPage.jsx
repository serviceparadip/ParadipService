import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SEO from "../components/SEO";
import { useAdminAuth } from "../context/AdminAuthContext";
import { api } from "../services/api";

const pricingInit = { category: "", serviceName: "", price: "", description: "" };
const heroSlideInit = {
  heading: "",
  subText: "",
  image: "",
  ctaText: "Book Now",
  ctaLink: "/book-now",
  sortOrder: 0
};
const testimonialInit = {
  name: "",
  role: "Customer",
  quote: "",
  rating: 5,
  location: "Odisha",
  sortOrder: 0
};

const AdminDashboardPage = () => {
  const { logout } = useAdminAuth();
  const [bookings, setBookings] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [pricingForm, setPricingForm] = useState(pricingInit);
  const [heroSlides, setHeroSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [heroForm, setHeroForm] = useState(heroSlideInit);
  const [testimonialForm, setTestimonialForm] = useState(testimonialInit);

  const loadData = async () => {
    try {
      const [bookingsRes, pricingRes, contactRes, heroRes, testimonialRes] = await Promise.all([
        api.get("/bookings"),
        api.get("/pricing"),
        api.get("/contact"),
        api.get("/hero-slides/admin/all"),
        api.get("/testimonials/admin/all")
      ]);
      setBookings(bookingsRes.data);
      setPricing(pricingRes.data);
      setContacts(contactRes.data);
      setHeroSlides(heroRes.data);
      setTestimonials(testimonialRes.data);
    } catch (error) {
      toast.error("Failed to load admin data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      toast.success("Booking status updated");
      loadData();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const addPricing = async (event) => {
    event.preventDefault();
    try {
      await api.post("/pricing", pricingForm);
      toast.success("Pricing added");
      setPricingForm(pricingInit);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add pricing");
    }
  };

  const deletePricing = async (id) => {
    try {
      await api.delete(`/pricing/${id}`);
      toast.success("Pricing deleted");
      loadData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const addHeroSlide = async (event) => {
    event.preventDefault();
    try {
      await api.post("/hero-slides", heroForm);
      toast.success("Hero slide added");
      setHeroForm(heroSlideInit);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add hero slide");
    }
  };

  const toggleHeroSlide = async (item) => {
    try {
      await api.put(`/hero-slides/${item._id}`, { isActive: !item.isActive });
      toast.success("Hero slide updated");
      loadData();
    } catch (error) {
      toast.error("Hero slide update failed");
    }
  };

  const deleteHeroSlide = async (id) => {
    try {
      await api.delete(`/hero-slides/${id}`);
      toast.success("Hero slide deleted");
      loadData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const addTestimonial = async (event) => {
    event.preventDefault();
    try {
      await api.post("/testimonials", testimonialForm);
      toast.success("Testimonial added");
      setTestimonialForm(testimonialInit);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add testimonial");
    }
  };

  const toggleTestimonial = async (item) => {
    try {
      await api.put(`/testimonials/${item._id}`, { isActive: !item.isActive });
      toast.success("Testimonial updated");
      loadData();
    } catch (error) {
      toast.error("Testimonial update failed");
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success("Testimonial deleted");
      loadData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="section-shell py-10">
      <SEO title="Admin Dashboard" description="Admin dashboard for ParadipService" />
      <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <h1 className="font-heading text-4xl font-bold text-brandBlue">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="rounded-lg bg-brandBlue px-4 py-2 text-sm font-bold text-white hover:bg-skyBlue"
        >
          Logout
        </button>
      </div>

      <section className="glass-card p-5">
        <h2 className="font-heading text-2xl font-semibold text-brandBlue">Bookings</h2>
        <div className="mt-4 space-y-3">
          {bookings.map((booking) => (
            <div key={booking._id} className="rounded-xl border border-skyBlue/20 p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-brandBlue">{booking.name} - {booking.applianceType}</p>
                  <p className="text-sm text-slate-600">{booking.phone} | {booking.date} {booking.time}</p>
                  {(booking.brand || booking.model) && (
                    <p className="text-sm text-slate-600">{booking.brand || "N/A"} | {booking.model || "N/A"}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-skyBlue/15 px-3 py-1 text-sm font-semibold text-brandBlue">
                    {booking.status}
                  </span>
                  <button
                    onClick={() => updateStatus(booking._id, booking.status === "Pending" ? "Completed" : "Pending")}
                    className="rounded-lg bg-mintGreen px-3 py-2 text-xs font-bold text-white"
                  >
                    Toggle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h2 className="font-heading text-2xl font-semibold text-brandBlue">Manage Service Pricing</h2>
          <form onSubmit={addPricing} className="mt-4 grid gap-3">
            <input placeholder="Category" value={pricingForm.category} onChange={(e) => setPricingForm({ ...pricingForm, category: e.target.value })} required className="rounded-lg border border-skyBlue/30 px-3 py-2" />
            <input placeholder="Service Name" value={pricingForm.serviceName} onChange={(e) => setPricingForm({ ...pricingForm, serviceName: e.target.value })} required className="rounded-lg border border-skyBlue/30 px-3 py-2" />
            <input placeholder="Price" value={pricingForm.price} onChange={(e) => setPricingForm({ ...pricingForm, price: e.target.value })} required className="rounded-lg border border-skyBlue/30 px-3 py-2" />
            <textarea placeholder="Description" value={pricingForm.description} onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })} className="rounded-lg border border-skyBlue/30 px-3 py-2" rows="3" />
            <button type="submit" className="rounded-lg bg-brandBlue px-4 py-2 font-bold text-white">Add Pricing</button>
          </form>

          <div className="mt-4 space-y-2">
            {pricing.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-lg border border-skyBlue/20 p-3 text-sm">
                <span>{item.category} - {item.serviceName} ({item.price})</span>
                <button onClick={() => deletePricing(item._id)} className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">Delete</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-heading text-2xl font-semibold text-brandBlue">Enquiries</h2>
          <div className="mt-4 space-y-3">
            {contacts.map((contact) => (
              <div key={contact._id} className="rounded-lg border border-skyBlue/20 p-3">
                <p className="font-semibold text-brandBlue">{contact.name}</p>
                <p className="text-sm text-slate-600">{contact.email}</p>
                <p className="mt-1 text-sm text-slate-700">{contact.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h2 className="font-heading text-2xl font-semibold text-brandBlue">Manage Hero Slides</h2>
          <form onSubmit={addHeroSlide} className="mt-4 grid gap-3">
            <input
              placeholder="Heading"
              value={heroForm.heading}
              onChange={(e) => setHeroForm({ ...heroForm, heading: e.target.value })}
              required
              className="rounded-lg border border-skyBlue/30 px-3 py-2"
            />
            <textarea
              placeholder="Sub text"
              value={heroForm.subText}
              onChange={(e) => setHeroForm({ ...heroForm, subText: e.target.value })}
              required
              className="rounded-lg border border-skyBlue/30 px-3 py-2"
              rows="2"
            />
            <input
              placeholder="Image URL"
              value={heroForm.image}
              onChange={(e) => setHeroForm({ ...heroForm, image: e.target.value })}
              required
              className="rounded-lg border border-skyBlue/30 px-3 py-2"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="CTA Text"
                value={heroForm.ctaText}
                onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                className="rounded-lg border border-skyBlue/30 px-3 py-2"
              />
              <input
                placeholder="CTA Link"
                value={heroForm.ctaLink}
                onChange={(e) => setHeroForm({ ...heroForm, ctaLink: e.target.value })}
                className="rounded-lg border border-skyBlue/30 px-3 py-2"
              />
            </div>
            <input
              type="number"
              placeholder="Sort order"
              value={heroForm.sortOrder}
              onChange={(e) => setHeroForm({ ...heroForm, sortOrder: Number(e.target.value) })}
              className="rounded-lg border border-skyBlue/30 px-3 py-2"
            />
            <button type="submit" className="rounded-lg bg-brandBlue px-4 py-2 font-bold text-white">Add Slide</button>
          </form>

          <div className="mt-4 space-y-2">
            {heroSlides.map((item) => (
              <div key={item._id} className="rounded-lg border border-skyBlue/20 p-3 text-sm">
                <p className="font-semibold text-brandBlue">{item.heading}</p>
                <p className="mt-1 text-slate-600">Order: {item.sortOrder} | {item.isActive ? "Active" : "Inactive"}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => toggleHeroSlide(item)} className="rounded bg-mintGreen px-2 py-1 text-xs font-semibold text-white">
                    {item.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => deleteHeroSlide(item._id)} className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-heading text-2xl font-semibold text-brandBlue">Manage Testimonials</h2>
          <form onSubmit={addTestimonial} className="mt-4 grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Name"
                value={testimonialForm.name}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                required
                className="rounded-lg border border-skyBlue/30 px-3 py-2"
              />
              <input
                placeholder="Role"
                value={testimonialForm.role}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                className="rounded-lg border border-skyBlue/30 px-3 py-2"
              />
            </div>
            <textarea
              placeholder="Customer feedback"
              value={testimonialForm.quote}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
              required
              className="rounded-lg border border-skyBlue/30 px-3 py-2"
              rows="3"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                value={testimonialForm.rating}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                className="rounded-lg border border-skyBlue/30 px-3 py-2"
              />
              <input
                placeholder="Location"
                value={testimonialForm.location}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, location: e.target.value })}
                className="rounded-lg border border-skyBlue/30 px-3 py-2"
              />
              <input
                type="number"
                placeholder="Sort order"
                value={testimonialForm.sortOrder}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, sortOrder: Number(e.target.value) })}
                className="rounded-lg border border-skyBlue/30 px-3 py-2"
              />
            </div>
            <button type="submit" className="rounded-lg bg-brandBlue px-4 py-2 font-bold text-white">Add Testimonial</button>
          </form>

          <div className="mt-4 space-y-2">
            {testimonials.map((item) => (
              <div key={item._id} className="rounded-lg border border-skyBlue/20 p-3 text-sm">
                <p className="font-semibold text-brandBlue">{item.name} ({item.rating}/5)</p>
                <p className="mt-1 text-slate-600">Order: {item.sortOrder} | {item.isActive ? "Active" : "Inactive"}</p>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => toggleTestimonial(item)} className="rounded bg-mintGreen px-2 py-1 text-xs font-semibold text-white">
                    {item.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => deleteTestimonial(item._id)} className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
