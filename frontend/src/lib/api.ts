const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types
export interface TravelRecord {
  _id: string;
  date: string;
  customerName: string;
  distance: number;
  petrolAmount: number;
  totalFare: number;
  month: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  date: string;
  name: string;
  time: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// API utility functions
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Travel Records API
export const travelRecordsAPI = {
  getAll: (): Promise<TravelRecord[]> => apiCall('/travel-records'),
  
  getByMonth: (month: string): Promise<TravelRecord[]> => 
    apiCall(`/travel-records/month/${month}`),
  
  getAvailableMonths: (): Promise<string[]> => 
    apiCall('/travel-records/months'),
  
  create: (record: Omit<TravelRecord, '_id' | 'month' | 'createdAt' | 'updatedAt'>): Promise<TravelRecord> => 
    apiCall('/travel-records', {
      method: 'POST',
      body: JSON.stringify(record),
    }),
  
  delete: (id: string): Promise<void> => 
    apiCall(`/travel-records/${id}`, {
      method: 'DELETE',
    }),
};

// Tasks API
export const tasksAPI = {
  getAll: (): Promise<Task[]> => apiCall('/tasks'),
  
  getByDate: (date: string): Promise<Task[]> => 
    apiCall(`/tasks/date/${date}`),
  
  getDates: (): Promise<string[]> => 
    apiCall('/tasks/dates'),
  
  create: (task: Omit<Task, '_id' | 'completed' | 'createdAt' | 'updatedAt'>): Promise<Task> => 
    apiCall('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    }),
  
  toggleCompletion: (id: string): Promise<Task> => 
    apiCall(`/tasks/${id}/toggle`, {
      method: 'PATCH',
    }),
  
  delete: (id: string): Promise<void> => 
    apiCall(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};

// Health check
export const healthCheck = (): Promise<{ status: string; timestamp: string; environment: string }> => 
  apiCall('/health');
