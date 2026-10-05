import axios from 'axios';

// Base URL — Vite proxy handles /api → http://localhost:8000/api in dev
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Attach Sanctum token to every request if present
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// On 401, clear session and redirect to admin login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem('adminToken');
            sessionStorage.removeItem('adminUser');
            // Redirect if currently inside /admin
            if (window.location.pathname.startsWith('/admin')) {
                window.location.href = '/admin';
            }
        }
        return Promise.reject(error);
    }
);

export default api;

// ─── Auth ───────────────────────────────────────────────────────────────────
export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/admin/auth/logout'),
    me: () => api.get('/admin/auth/me'),
    updateProfile: (data) => api.put('/admin/auth/profile', data),
    changePassword: (data) => api.put('/admin/auth/password', data),
};

// ─── Services (public) ──────────────────────────────────────────────────────
export const servicesAPI = {
    list: () => api.get('/services'),
    show: (id) => api.get(`/services/${id}`),
    create: (data) => api.post('/admin/services', data),
    update: (id, d) => api.put(`/admin/services/${id}`, d),
    destroy: (id) => api.delete(`/admin/services/${id}`),
};

// ─── Bookings ────────────────────────────────────────────────────────────────
export const bookingsAPI = {
    store: (data) => api.post('/bookings', data),
    list: (params) => api.get('/admin/bookings', { params }),
    show: (id) => api.get(`/admin/bookings/${id}`),
    update: (id, data) => api.put(`/admin/bookings/${id}`, data),
    destroy: (id) => api.delete(`/admin/bookings/${id}`),
    export: (params) => api.get('/admin/bookings/export', {
        params,
        responseType: 'blob',
    }),
};

// ─── Feedback ────────────────────────────────────────────────────────────────
export const feedbackAPI = {
    store: (data) => api.post('/feedback', data),
    list: (params) => api.get('/admin/feedback', { params }),
    show: (id) => api.get(`/admin/feedback/${id}`),
    updateStatus: (id, status) => api.patch(`/admin/feedback/${id}/status`, { status }),
    destroy: (id) => api.delete(`/admin/feedback/${id}`),
};

// ─── Team ────────────────────────────────────────────────────────────────────
export const teamAPI = {
    list: (params) => api.get('/team', { params }),
    show: (id) => api.get(`/team/${id}`),
    create: (data) => api.post('/admin/team', data),
    update: (id, data) => api.put(`/admin/team/${id}`, data),
    destroy: (id) => api.delete(`/admin/team/${id}`),
    updateAccess: (id, level) => api.patch(`/admin/team/${id}/access`, { access_level: level }),
};

// ─── Portfolio ───────────────────────────────────────────────────────────────
export const portfolioAPI = {
    list: () => api.get('/portfolio'),
    create: (data) => api.post('/admin/portfolio', data),
    update: (id, data) => api.put(`/admin/portfolio/${id}`, data),
    destroy: (id) => api.delete(`/admin/portfolio/${id}`),
};

// ─── Calendar ────────────────────────────────────────────────────────────────
export const calendarAPI = {
    list: (params) => api.get('/admin/calendar', { params }),
    create: (data) => api.post('/admin/calendar', data),
    update: (id, data) => api.put(`/admin/calendar/${id}`, data),
    destroy: (id) => api.delete(`/admin/calendar/${id}`),
};

// ─── Audit Logs ──────────────────────────────────────────────────────────────
export const auditAPI = {
    list: (params) => api.get('/admin/audit-logs', { params }),
};

// ─── Settings ────────────────────────────────────────────────────────────────
export const settingsAPI = {
    show: () => api.get('/admin/settings'),
    update: (data) => api.put('/admin/settings', data),
};

// ─── Analytics ───────────────────────────────────────────────────────────────
export const analyticsAPI = {
    dashboard: () => api.get('/admin/analytics/dashboard'),
    bookings: (params) => api.get('/admin/analytics/bookings', { params }),
    feedback: () => api.get('/admin/analytics/feedback'),
};
