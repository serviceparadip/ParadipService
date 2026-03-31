import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useAdminAuth } from "../context/AdminAuthContext";
import { api } from "../services/api";

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token);
      toast.success("Admin login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-shell py-16">
      <SEO title="Admin Login" description="ParadipService admin login" />
      <div className="mx-auto max-w-md glass-card p-6">
        <h1 className="font-heading text-3xl font-bold text-brandBlue">Admin Login</h1>
        <form onSubmit={submit} className="mt-5 grid gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded-lg border border-skyBlue/30 px-3 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="rounded-lg border border-skyBlue/30 px-3 py-3"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-brandBlue px-4 py-3 font-bold text-white hover:bg-skyBlue disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
