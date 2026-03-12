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

  async changePassword(currentPassword: string, newPassword: string): Promise<any> {
    return this.request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async forgotPassword(email: string): Promise<any> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<any> {
    return this.request(`/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
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

  async searchMovies(params: {
    q?: string;
    genre?: string;
    rating?: string;
    minDuration?: number;
    maxDuration?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }): Promise<any> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    return this.request(`/movies/search${queryString ? `?${queryString}` : ''}`);
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

  async deleteBooking(bookingId: string): Promise<any> {
    return this.request(`/bookings/${bookingId}`, {
      method: 'DELETE',
    });
  }

  async getBookedSeats(showtimeId: string): Promise<any> {
    return this.request(`/bookings/showtime/${showtimeId}/booked-seats`);
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

  async getRegions(): Promise<any> {
    return this.request('/theaters/regions');
  }

  async getTheatersByRegion(region: string): Promise<any> {
    return this.request(`/theaters/region/${encodeURIComponent(region)}`);
  }

  async getMoviesByTheater(theaterId: string): Promise<any> {
    return this.request(`/theaters/${theaterId}/movies`);
  }

  async getShowtimesByTheaterAndMovie(theaterId: string, movieId: string, date?: string): Promise<any> {
    const params = date ? `?date=${date}` : '';
    return this.request(`/theaters/${theaterId}/movies/${movieId}/showtimes${params}`);
  }

  // Admin methods
  async getAdminStats(): Promise<any> {
    return this.request('/admin/stats');
  }

  async getAllUsers(): Promise<any> {
    return this.request('/admin/users');
  }

  async updateUserRole(userId: string, role: string): Promise<any> {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(userId: string): Promise<any> {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getAllBookings(): Promise<any> {
    return this.request('/admin/bookings');
  }

  async updateBookingStatus(bookingId: string, status: string): Promise<any> {
    return this.request(`/admin/bookings/${bookingId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Admin CRUD for Movies
  async createMovie(movieData: any): Promise<any> {
    return this.request('/movies', {
      method: 'POST',
      body: JSON.stringify(movieData),
    });
  }

  async updateMovie(id: string, movieData: any): Promise<any> {
    return this.request(`/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(movieData),
    });
  }

  async deleteMovie(id: string): Promise<any> {
    return this.request(`/movies/${id}`, {
      method: 'DELETE',
    });
  }

  // Admin CRUD for Theaters
  async createTheater(theaterData: any): Promise<any> {
    return this.request('/theaters', {
      method: 'POST',
      body: JSON.stringify(theaterData),
    });
  }

  async updateTheater(id: string, theaterData: any): Promise<any> {
    return this.request(`/theaters/${id}`, {
      method: 'PUT',
      body: JSON.stringify(theaterData),
    });
  }

  async deleteTheater(id: string): Promise<any> {
    return this.request(`/theaters/${id}`, {
      method: 'DELETE',
    });
  }

  // Admin CRUD for Showtimes
  async createShowtime(showtimeData: any): Promise<any> {
    return this.request('/showtimes', {
      method: 'POST',
      body: JSON.stringify(showtimeData),
    });
  }

  async updateShowtime(id: string, showtimeData: any): Promise<any> {
    return this.request(`/showtimes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(showtimeData),
    });
  }

  async deleteShowtime(id: string): Promise<any> {
    return this.request(`/showtimes/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllShowtimes(filters?: { date?: string; movieId?: string; theaterId?: string }): Promise<any> {
    const params = new URLSearchParams();
    if (filters?.date) params.append('date', filters.date);
    if (filters?.movieId) params.append('movieId', filters.movieId);
    if (filters?.theaterId) params.append('theaterId', filters.theaterId);

    const query = params.toString();
    return this.request(`/showtimes${query ? `?${query}` : ''}`);
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
