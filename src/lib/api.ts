// API client using environment variables
import { config } from './config';

const API_BASE_URL = config.API_BASE_URL;

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      } as Record<string, string>,
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string): Promise<any> {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  }

  async register(email: string, password: string, name: string): Promise<any> {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  }

  async getProfile(): Promise<any> {
    return this.request('/auth/profile');
  }

  async getUserById(userId: string): Promise<any> {
    return this.request(`/auth/${userId}`);
  }

  async updateProfile(data: any): Promise<any> {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  // Movie methods
  async getMovies(): Promise<any> {
    return this.request('/movies');
  }

  async getMovie(id: string): Promise<any> {
    return this.request(`/movies/${id}`);
  }

  // Booking methods
  async getBookings(): Promise<any> {
    return this.request('/bookings');
  }

  async createBooking(bookingData: any): Promise<any> {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async cancelBooking(bookingId: string): Promise<any> {
    return this.request(`/bookings/${bookingId}/cancel`, {
      method: 'PUT',
    });
  }

  // Showtime methods
  async getShowtimesByMovie(movieId: string, date?: string): Promise<any> {
    const params = date ? `?date=${date}` : '';
    return this.request(`/showtimes/movie/${movieId}${params}`);
  }

  async getShowtime(id: string): Promise<any> {
    return this.request(`/showtimes/${id}`);
  }

  // Theater methods
  async getTheaters(): Promise<any> {
    return this.request('/theaters');
  }
}

// Create singleton instance
export const api = new ApiClient();

// React hook to check if user is authenticated
export const useAuth = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

export default api;
