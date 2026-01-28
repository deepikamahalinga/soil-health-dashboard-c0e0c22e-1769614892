// soilreport.api.ts

import axios, { AxiosError, AxiosResponse } from 'axios';

// Types
export interface SoilReport {
  id: string;
  state: string;
  district: string;
  village: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  timestamp: string;
}

export interface CreateSoilReportDTO {
  state: string;
  district: string;
  village: string;
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface UpdateSoilReportDTO extends Partial<CreateSoilReportDTO> {}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface FilterParams {
  state?: string;
  district?: string;
  village?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// API client setup
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleError = (error: AxiosError) => {
  if (error.response) {
    // Server responded with error
    throw new Error(error.response.data?.message || 'An error occurred');
  } else if (error.request) {
    // Request made but no response
    throw new Error('No response from server');
  } else {
    // Request setup error
    throw new Error('Error setting up request');
  }
};

// API functions
export const getAllSoilReports = async (
  filters?: FilterParams,
  pagination?: PaginationParams
): Promise<PaginatedResponse<SoilReport>> => {
  try {
    const response: AxiosResponse<PaginatedResponse<SoilReport>> = await apiClient.get(
      '/soilreports',
      {
        params: {
          ...filters,
          ...pagination,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const getSoilReportById = async (id: string): Promise<SoilReport> => {
  try {
    const response: AxiosResponse<SoilReport> = await apiClient.get(`/soilreports/${id}`);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const createSoilReport = async (data: CreateSoilReportDTO): Promise<SoilReport> => {
  try {
    const response: AxiosResponse<SoilReport> = await apiClient.post('/soilreports', data);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const updateSoilReport = async (
  id: string,
  data: UpdateSoilReportDTO
): Promise<SoilReport> => {
  try {
    const response: AxiosResponse<SoilReport> = await apiClient.put(
      `/soilreports/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

export const deleteSoilReport = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/soilreports/${id}`);
  } catch (error) {
    handleError(error as AxiosError);
    throw error;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);