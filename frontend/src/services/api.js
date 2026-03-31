import axios from "axios";

const token = localStorage.getItem("paradip_admin_token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: token ? { Authorization: `Bearer ${token}` } : {}
});

export const setAuthToken = (newToken) => {
  if (newToken) {
    api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
