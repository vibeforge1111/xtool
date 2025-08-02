import { apiService } from './api';
import type { User, AuthResponse, OAuthInitResponse } from '../types/user';

class AuthService {
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  constructor() {
    this.loadUserFromStorage();
  }

  // Event listener management
  addListener(callback: (user: User | null) => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: (user: User | null) => void) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user));
  }

  // Load user from localStorage
  private loadUserFromStorage() {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        this.notifyListeners();
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
      this.logout();
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.user;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.user && !!localStorage.getItem('authToken');
  }

  // Initiate Twitter OAuth
  async initiateTwitterAuth(): Promise<OAuthInitResponse> {
    try {
      const response = await apiService.initiateTwitterAuth() as OAuthInitResponse;
      
      // Store OAuth state for verification
      localStorage.setItem('oauthCodeVerifier', response.codeVerifier);
      localStorage.setItem('oauthState', response.state);
      
      return response;
    } catch (error) {
      console.error('Failed to initiate Twitter auth:', error);
      throw error;
    }
  }

  // Complete Twitter OAuth
  async completeTwitterAuth(code: string, state: string): Promise<AuthResponse> {
    try {
      const storedCodeVerifier = localStorage.getItem('oauthCodeVerifier');
      const storedState = localStorage.getItem('oauthState');

      if (!storedCodeVerifier || !storedState) {
        throw new Error('Missing OAuth verification data');
      }

      if (state !== storedState) {
        throw new Error('Invalid OAuth state');
      }

      const response = await apiService.completeTwitterAuth(
        code,
        storedCodeVerifier,
        state
      ) as AuthResponse;

      // Store tokens and user data
      localStorage.setItem('authToken', response.tokens.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('twitterTokens', JSON.stringify({
        accessToken: response.tokens.twitterAccessToken,
        refreshToken: response.tokens.twitterRefreshToken,
        expiresIn: response.tokens.expiresIn,
      }));

      // Clean up OAuth temp data
      localStorage.removeItem('oauthCodeVerifier');
      localStorage.removeItem('oauthState');

      this.user = response.user;
      this.notifyListeners();

      return response;
    } catch (error) {
      console.error('Failed to complete Twitter auth:', error);
      throw error;
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('twitterTokens');
    localStorage.removeItem('oauthCodeVerifier');
    localStorage.removeItem('oauthState');
    
    this.user = null;
    this.notifyListeners();
  }

  // Verify token validity
  async verifyToken(): Promise<boolean> {
    try {
      if (!this.isAuthenticated()) {
        return false;
      }

      await apiService.verifyToken();
      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      this.logout();
      return false;
    }
  }
}

export const authService = new AuthService();