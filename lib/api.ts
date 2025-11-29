const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
    async fetch(endpoint: string, options: RequestInit = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/auth';
            throw new Error('Unauthorized');
        }

        return response;
    },

    async get(endpoint: string) {
        const res = await this.fetch(endpoint);
        return res.json();
    },

    async post(endpoint: string, data: any) {
        const res = await this.fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Something went wrong');
        }
        return res.json();
    },

    async put(endpoint: string, data: any) {
        const res = await this.fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        return res.json();
    },
};
