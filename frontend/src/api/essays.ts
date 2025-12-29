import apiClient from './client';
import type { Essay, EssayListItem, EssaySubmit, Analysis } from '@/types';

export const essaysApi = {
  // Submit essay for analysis
  submit: async (userId: string, data: EssaySubmit): Promise<Analysis> => {
    const response = await apiClient.post(`/api/essays/submit?user_id=${userId}`, data);
    return response.data;
  },

  // Get user's essays
  getAll: async (userId: string, limit = 10, offset = 0): Promise<EssayListItem[]> => {
    const response = await apiClient.get(`/api/essays?user_id=${userId}&limit=${limit}&offset=${offset}`);
    return response.data;
  },

  // Get single essay
  getById: async (essayId: string): Promise<Essay> => {
    const response = await apiClient.get(`/api/essays/${essayId}`);
    return response.data;
  },

  // Get essay analysis
  getAnalysis: async (essayId: string): Promise<Analysis> => {
    const response = await apiClient.get(`/api/essays/${essayId}/analysis`);
    return response.data;
  },

  // Delete essay
  delete: async (essayId: string): Promise<void> => {
    await apiClient.delete(`/api/essays/${essayId}`);
  },
};