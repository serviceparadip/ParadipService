import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import MobileStickyActions from "./components/MobileStickyActions";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import WhatsAppButton from "./components/WhatsAppButton";
import AcServicePage from "./pages/AcServicePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import BookNowPage from "./pages/BookNowPage";
import ContactPage from "./pages/ContactPage";
import CityServicePage from "./pages/CityServicePage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServiceChargesPage from "./pages/ServiceChargesPage";
import ServicesPage from "./pages/ServicesPage";

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ac-service" element={<AcServicePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service-charges" element={<ServiceChargesPage />} />
          <Route path="/book-now" element={<BookNowPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/city/:citySlug" element={<CityServicePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyActions />
    </div>
  );
};

export default App;
