import express from 'express';
import { body, param, query } from 'express-validator';
import { validateRequest } from '../middleware/validate-request';
import {
  createSoilReport,
  deleteSoilReport,
  getAllSoilReports,
  getSoilReportById,
  updateSoilReport
} from '../controllers/soilreport.controller';

const router = express.Router();

// Validation schemas
const soilReportValidation = [
  body('state')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage('State is required and must be less than 100 characters'),
  body('district')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage('District is required and must be less than 100 characters'),
  body('village')
    .isString()
    .trim()
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage('Village is required and must be less than 100 characters'),
  body('ph')
    .isDecimal({ decimal_digits: '0,2' })
    .notEmpty()
    .withMessage('pH value is required and must be a decimal with up to 2 decimal places'),
  body('nitrogen')
    .isDecimal({ decimal_digits: '0,2' })
    .notEmpty()
    .withMessage('Nitrogen value is required and must be a decimal with up to 2 decimal places'),
  body('phosphorus')
    .isDecimal({ decimal_digits: '0,2' })
    .notEmpty()
    .withMessage('Phosphorus value is required and must be a decimal with up to 2 decimal places'),
  body('potassium')
    .isDecimal({ decimal_digits: '0,2' })
    .notEmpty()
    .withMessage('Potassium value is required and must be a decimal with up to 2 decimal places')
];

const idValidation = [
  param('id').isUUID().withMessage('Invalid soil report ID')
];

// Routes
router.get('/', 
  query('state').optional().isString(),
  query('district').optional().isString(),
  query('village').optional().isString(),
  validateRequest,
  getAllSoilReports
);

router.get('/:id',
  idValidation,
  validateRequest,
  getSoilReportById
);

router.post('/',
  soilReportValidation,
  validateRequest,
  createSoilReport
);

router.put('/:id',
  [...idValidation, ...soilReportValidation],
  validateRequest,
  updateSoilReport
);

router.delete('/:id',
  idValidation,
  validateRequest,
  deleteSoilReport
);

export default router;