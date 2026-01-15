/**
 * API Client for Decision Autopilot Backend
 * Handles all HTTP requests to the FastAPI backend
 */

const API_BASE_URL = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) || 'http://localhost:8000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * POST request helper
 */
export async function post<T>(endpoint: string, body: unknown): Promise<T> {
    return fetchApi<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    });
}

/**
 * GET request helper
 */
export async function get<T>(endpoint: string): Promise<T> {
    return fetchApi<T>(endpoint, {
        method: 'GET',
    });
}

/**
 * Health check
 */
export async function checkHealth(): Promise<{ status: string }> {
    return get('/health');
}
