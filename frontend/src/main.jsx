import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AdminAuthProvider>
          <App />
          <Toaster position="top-right" />
        </AdminAuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
