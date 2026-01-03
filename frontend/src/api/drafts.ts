import apiClient from './client';

export interface Draft {
  id: string;
  user_id: string;
  title: string;
  content: string;
  theme: string;
  hsk_level: number;
  char_count: number;
  created_at: string;
  updated_at: string;
}

export interface DraftCreate {
  title: string;
  content: string;
  theme: string;
  hsk_level: number;
  char_count: number;
}

export interface DraftUpdate {
  title?: string;
  content?: string;
  theme?: string;
  hsk_level?: number;
  char_count?: number;
}

export const draftsApi = {
  // Create draft
  create: async (data: DraftCreate): Promise<Draft> => {
    const response = await apiClient.post('/api/drafts', data);
    return response.data;
  },

  // Get all drafts
  getAll: async (): Promise<Draft[]> => {
    const response = await apiClient.get('/api/drafts');
    return response.data;
  },

  // Get single draft
  getById: async (draftId: string): Promise<Draft> => {
    const response = await apiClient.get(`/api/drafts/${draftId}`);
    return response.data;
  },

  // Update draft
  update: async (draftId: string, data: DraftUpdate): Promise<Draft> => {
    const response = await apiClient.put(`/api/drafts/${draftId}`, data);
    return response.data;
  },

  // Delete draft
  delete: async (draftId: string): Promise<void> => {
    await apiClient.delete(`/api/drafts/${draftId}`);
  },
};
