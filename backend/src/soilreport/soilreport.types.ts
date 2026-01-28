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
  
  /** Nitrogen content in soil (mg/kg) */
  nitrogen: number;
  
  /** Phosphorus content in soil (mg/kg) */
  phosphorus: number;
  
  /** Potassium content in soil (mg/kg) */
  potassium: number;
  
  /** Timestamp when report was created */
  timestamp: Date;
};

/**
 * Represents soil report data without system-managed fields
 */
export type SoilReportWithoutTimestamp = Omit<SoilReport, 'timestamp'>;

/**
 * Represents fields that can be updated in a soil report
 */
export type UpdateSoilReport = Partial<Omit<SoilReport, 'id' | 'timestamp'>>;

/**
 * Represents fields required when creating a new soil report
 */
export type CreateSoilReport = Omit<SoilReport, 'id' | 'timestamp'>;

/**
 * Represents soil report with any related entities
 */
export type SoilReportWithRelations = SoilReport & {
  // Add relation fields here as needed
  // Example: farms?: Farm[];
};

/**
 * Represents filter criteria for querying soil reports
 */
export type SoilReportFilters = Partial<{
  state: string;
  district: string;
  village: string;
  phMin: number;
  phMax: number;
  nitrogenMin: number;
  nitrogenMax: number;
  phosphorusMin: number;
  phosphorusMax: number;
  potassiumMin: number;
  potassiumMax: number;
  fromDate: Date;
  toDate: Date;
}>;

/**
 * Represents sort options for soil report queries
 */
export type SoilReportSortFields = keyof Omit<SoilReport, 'id'>;