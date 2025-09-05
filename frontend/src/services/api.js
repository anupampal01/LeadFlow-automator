import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust if your backend runs on a different port
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Public API calls
export const submitLead = (data) => API.post('/leads', data);
export const loginUser = (data) => API.post('/auth/login', data);

// Private (Authenticated) API calls
export const getLeads = () => API.get('/leads');
export const updateLeadStatus = (id, status) => API.put(`/leads/${id}`, { status });
export const getScoringRules = () => API.get('/scoring-rules');
export const createScoringRule = (data) => API.post('/scoring-rules', data);
export const updateScoringRule = (id, data) => API.put(`/scoring-rules/${id}`, data);
export const deleteScoringRule = (id) => API.delete(`/scoring-rules/${id}`);