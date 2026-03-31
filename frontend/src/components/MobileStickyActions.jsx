import { Link } from "react-router-dom";

const MobileStickyActions = () => {
  const callNumber = "+919668274949";
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919668274949";
  const waText = encodeURIComponent("Hello ParadipService, I want to book a repair service");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${callNumber}`}
          className="inline-flex items-center justify-center rounded-lg bg-brandBlue px-3 py-2 text-sm font-bold text-white"
        >
          Call
        </a>
        <a
          href={`https://wa.me/${waNumber}?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-mintGreen px-3 py-2 text-sm font-bold text-white"
        >
          WhatsApp
        </a>
        <Link
          to="/book-now"
          className="inline-flex items-center justify-center rounded-lg bg-[#eb5f6a] px-3 py-2 text-sm font-bold text-white"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default MobileStickyActions;
