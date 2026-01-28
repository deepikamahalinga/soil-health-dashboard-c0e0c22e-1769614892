/**
 * Represents a soil test report with location and nutrient analysis data
 */
export type SoilReport = {
  /** Unique identifier for the soil report */
  id: string;
  
  /** State/province where sample was collected */
  state: string;
  
  /** District/county where sample was collected */
  district: string;
  
  /** Village/town where sample was collected */
  village: string;
  
  /** pH level of soil (0-14 scale) */
  ph: number;
  
  /** Nitrogen content in mg/kg */
  nitrogen: number;
  
  /** Phosphorus content in mg/kg */
  phosphorus: number;
  
  /** Potassium content in mg/kg */ 
  potassium: number;
  
  /** Timestamp when report was created */
  timestamp: Date;
};

/**
 * Data required to create a new soil report
 * Excludes auto-generated fields
 */
export type CreateSoilReportDto = Omit<SoilReport, 'id' | 'timestamp'>;

/**
 * Data that can be updated for an existing soil report
 * All fields are optional
 */
export type UpdateSoilReportDto = Partial<CreateSoilReportDto>;

/**
 * Filter parameters for querying soil reports
 */
export type SoilReportFilterParams = {
  /** Filter by state */
  state?: string;
  
  /** Filter by district */
  district?: string;
  
  /** Filter by village */
  village?: string;
  
  /** Filter by minimum pH value */
  minPh?: number;
  
  /** Filter by maximum pH value */
  maxPh?: number;
  
  /** Filter by minimum nitrogen content */
  minNitrogen?: number;
  
  /** Filter by maximum nitrogen content */
  maxNitrogen?: number;
  
  /** Filter by minimum phosphorus content */
  minPhosphorus?: number;
  
  /** Filter by maximum phosphorus content */
  maxPhosphorus?: number;
  
  /** Filter by minimum potassium content */
  minPotassium?: number;
  
  /** Filter by maximum potassium content */
  maxPotassium?: number;
  
  /** Filter by start date */
  startDate?: Date;
  
  /** Filter by end date */
  endDate?: Date;
};

/**
 * Pagination parameters for list queries
 */
export type PaginationParams = {
  /** Page number (1-based) */
  page: number;
  
  /** Number of items per page */
  limit: number;
  
  /** Sort field */
  sortBy?: keyof SoilReport;
  
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
};

/**
 * Response structure for paginated soil report list
 */
export type PaginatedSoilReportResponse = {
  /** List of soil reports for current page */
  data: SoilReport[];
  
  /** Total number of records matching the filter */
  total: number;
  
  /** Current page number */
  page: number;
  
  /** Number of items per page */
  limit: number;
  
  /** Total number of pages */
  totalPages: number;
};

/**
 * Validation constraints for soil report fields
 */
export const SOIL_REPORT_CONSTRAINTS = {
  PH_MIN: 0,
  PH_MAX: 14,
  NUTRIENT_MIN: 0,
  NUTRIENT_MAX: 99999.99,
  STRING_MAX_LENGTH: 100
} as const;