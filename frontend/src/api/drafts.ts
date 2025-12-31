// src/api/drafts.ts
import apiClient from './client';
import type { Draft } from '@/types';

export const draftsApi = {
  // Create new draft
  create: async (userId: string, data: {
    title?: string;
    content?: string;
    theme?: string;
    hsk_level?: number;
  }): Promise<Draft> => {
    const response = await apiClient.post(`/api/drafts?user_id=${userId}`, data);
    return response.data;
  },

  // Get user's drafts
  getAll: async (userId: string): Promise<Draft[]> => {
    const response = await apiClient.get(`/api/drafts?user_id=${userId}`);
    return response.data;
  },

  // Get single draft
  getById: async (draftId: string): Promise<Draft> => {
    const response = await apiClient.get(`/api/drafts/${draftId}`);
    return response.data;
  },

  // Update draft
  update: async (draftId: string, data: {
    title?: string;
    content?: string;
    theme?: string;
    hsk_level?: number;
  }): Promise<Draft> => {
    const response = await apiClient.put(`/api/drafts/${draftId}`, data);
    return response.data;
  },

  // Delete draft
  delete: async (draftId: string): Promise<void> => {
    await apiClient.delete(`/api/drafts/${draftId}`);
  },
};