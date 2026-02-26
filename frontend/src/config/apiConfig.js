export const API_BASE_URL = "http://localhost:5001/api";

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
        SCORING_CONFIG: "/admin/scoring-config",
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
        BINS: "/waste/bins",
        MY_BIN: "/waste/my-bin",
    },

    ACTIONS: "/actions",
    ARTICLES: "/articles",
    GEMINI: "/gemini",
    WEATHER: "/weather",
    WEATHER_FORECAST: "/weather/forecast",
    SETTINGS: "/settings",
    ORDERS: "/orders",
    PRODUCTS: "/products",
    // ISSUES: "/issues",

    ISSUES: {
        BASE: "/issues",
        MY: "/issues/my",
        BY_ID: "/issues",
        MESSAGES: "/issues",
    },
};