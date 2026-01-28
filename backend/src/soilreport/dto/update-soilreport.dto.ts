import { z } from 'zod';

export const UpdateSoilReportSchema = z.object({
  state: z.string()
    .min(1, 'State is required')
    .max(100, 'State cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'State must contain only letters and spaces'),
    
  district: z.string()
    .min(1, 'District is required') 
    .max(100, 'District cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'District must contain only letters and spaces'),
    
  village: z.string()
    .min(1, 'Village is required')
    .max(100, 'Village cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Village must contain only letters and spaces'),
    
  ph: z.number()
    .min(0, 'pH must be greater than 0')
    .max(14, 'pH must be less than 14')
    .multipleOf(0.01, 'pH must have at most 2 decimal places'),
    
  nitrogen: z.number()
    .min(0, 'Nitrogen content must be greater than 0')
    .max(999999.99, 'Nitrogen content too high')
    .multipleOf(0.01, 'Nitrogen must have at most 2 decimal places'),
    
  phosphorus: z.number()
    .min(0, 'Phosphorus content must be greater than 0') 
    .max(999999.99, 'Phosphorus content too high')
    .multipleOf(0.01, 'Phosphorus must have at most 2 decimal places'),
    
  potassium: z.number()
    .min(0, 'Potassium content must be greater than 0')
    .max(999999.99, 'Potassium content too high')
    .multipleOf(0.01, 'Potassium must have at most 2 decimal places'),
}).partial();

export type UpdateSoilReportDto = z.infer<typeof UpdateSoilReportSchema>;