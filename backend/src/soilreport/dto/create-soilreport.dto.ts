import { z } from 'zod';

/**
 * DTO Schema for creating a new soil report
 * Validates input data for soil analysis reports
 */
export const CreateSoilReportSchema = z.object({
  /**
   * State where soil sample was collected
   * @example "Maharashtra"
   */
  state: z
    .string()
    .min(2, 'State name must be at least 2 characters')
    .max(100, 'State name cannot exceed 100 characters')
    .trim(),

  /**
   * District where soil sample was collected
   * @example "Pune"
   */
  district: z
    .string()
    .min(2, 'District name must be at least 2 characters')
    .max(100, 'District name cannot exceed 100 characters')
    .trim(),

  /**
   * Village where soil sample was collected
   * @example "Wagholi"
   */
  village: z
    .string()
    .min(2, 'Village name must be at least 2 characters')
    .max(100, 'Village name cannot exceed 100 characters')
    .trim(),

  /**
   * pH value of soil sample
   * Valid range: 0.00 to 14.00
   * @example 7.5
   */
  ph: z
    .number()
    .min(0, 'pH cannot be negative')
    .max(14, 'pH cannot exceed 14')
    .multipleOf(0.01),

  /**
   * Nitrogen content in soil (mg/kg)
   * @example 145.50
   */
  nitrogen: z
    .number()
    .positive('Nitrogen content must be positive')
    .max(999999.99, 'Nitrogen content too high')
    .multipleOf(0.01),

  /**
   * Phosphorus content in soil (mg/kg)
   * @example 22.40
   */
  phosphorus: z
    .number()
    .positive('Phosphorus content must be positive')
    .max(999999.99, 'Phosphorus content too high')
    .multipleOf(0.01),

  /**
   * Potassium content in soil (mg/kg)
   * @example 235.80
   */
  potassium: z
    .number()
    .positive('Potassium content must be positive')
    .max(999999.99, 'Potassium content too high')
    .multipleOf(0.01),
});

/**
 * Type definition for Soil Report creation payload
 */
export type CreateSoilReportDto = z.infer<typeof CreateSoilReportSchema>;

/**
 * Example usage:
 * const soilReport: CreateSoilReportDto = {
 *   state: "Maharashtra",
 *   district: "Pune",
 *   village: "Wagholi",
 *   ph: 7.5,
 *   nitrogen: 145.50,
 *   phosphorus: 22.40,
 *   potassium: 235.80
 * };
 */