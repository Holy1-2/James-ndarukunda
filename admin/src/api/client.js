import axios from "axios";

// Change this line to use Next.js process.env instead of Vite's import.meta
const configured = /^https?:\/\//.test(process.env.NEXT_PUBLIC_API_URL ?? "");

export const API_BASE = configured ? process.env.NEXT_PUBLIC_API_URL : "";

export const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jaems_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jaems_admin_token");
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export function getToken() {
  return localStorage.getItem("jaems_admin_token");
}

export function setToken(token) {
  localStorage.setItem("jaems_admin_token", token);
}

export function clearToken() {
  localStorage.removeItem("jaems_admin_token");
}

export function errMessage(error, fallback = "Something went wrong.") {
  return error?.response?.data?.message ?? error?.message ?? fallback;
}
