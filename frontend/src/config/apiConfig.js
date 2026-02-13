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
    }
};
