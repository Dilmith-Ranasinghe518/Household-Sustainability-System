export const API_BASE_URL = 'http://localhost:5001/api';

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER_INITIATE: '/auth/register/initiate',
        REGISTER_VERIFY: '/auth/register/verify',
        REGISTER_COMPLETE: '/auth/register/complete',
        LOGIN: '/auth/login',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        USER_PROFILE: '/user/profile'
    },
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        USERS: '/admin/users' // GET, DELETE, PUT
    },
    AUDIT: {
        BASE: '/audit', // GET, POST
        ALL: '/audit/all', // GET (Admin only)
        BY_ID: '/audit' // PUT, DELETE (append /:id)
    },
    WASTE: {
        BASE: '/waste', // GET, POST
        ALL: '/waste/all', // GET (Admin only)
        BY_ID: '/waste' // PUT (append /:id)
    }
};
