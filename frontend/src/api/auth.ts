import apiClient from './client';

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  target_hsk_level?: number;
  preferred_language?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    username: string;
    target_hsk_level: number;
    preferred_language: string;
    dark_mode: boolean;
    created_at: string;
    last_login: string;
  };
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  target_hsk_level: number;
  preferred_language: string;
  dark_mode: boolean;
  created_at: string;
  last_login: string;
}

export const authApi = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/users/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/api/users/login', data);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await apiClient.get('/api/users/me');
    return response.data;
  },

  // Update user settings
  updateSettings: async (settings: {
    target_hsk_level?: number;
    preferred_language?: string;
    dark_mode?: boolean;
  }): Promise<UserResponse> => {
    const response = await apiClient.put('/api/users/me/settings', settings);
    return response.data;
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post(`/api/users/forgot-password?email=${email}`);
    return response.data;
  },

  // Verify reset token
  verifyResetToken: async (token: string): Promise<{ valid: boolean; message: string }> => {
    const response = await apiClient.get(`/api/users/verify-reset-token/${token}`);
    return response.data;
  },

  // Reset password
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post(`/api/users/reset-password?token=${token}&new_password=${newPassword}`);
    return response.data;
  },
};
