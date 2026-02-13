export const API_BASE_URL = 'http://localhost:5001/api';

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
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
