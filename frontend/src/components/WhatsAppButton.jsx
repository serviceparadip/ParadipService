const WhatsAppButton = () => {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || "919999999999";
  const text = encodeURIComponent("Hello ParadipService, I want to book a repair service");
  const url = `https://wa.me/${number}?text=${text}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-5 z-40 rounded-full bg-mintGreen p-4 text-white shadow-service transition hover:scale-105 md:bottom-5"
      aria-label="Chat on WhatsApp"
    >
      WA
    </a>
  );
};

export default WhatsAppButton;
