export const API_BASE_URL = "http://localhost:5000/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER_INITIATE: "/auth/register/initiate",
    REGISTER_VERIFY: "/auth/register/verify",
    REGISTER_COMPLETE: "/auth/register/complete",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    USER_PROFILE: "/user/profile",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users", // GET, DELETE, PUT
  },

  
  DISASTERS: "/disasters",

  AUDIT: {
    BASE: "/audit",
    ALL: "/audit/all",
    BY_ID: "/audit",
  },

  WASTE: {
    BASE: "/waste",
    ALL: "/waste/all",
    BY_ID: "/waste",
  },

  ACTIONS: "/actions",
  ARTICLES: "/articles",
  GEMINI: "/gemini",
};
