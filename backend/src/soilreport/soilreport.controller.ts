import { Request, Response, NextFunction } from 'express';
import { SoilReportService } from '../services/soilreport.service';
import { validate } from 'class-validator';
import { SoilReport } from '../entities/soilreport.entity';
import { ApiError } from '../utils/ApiError';
import { PaginationParams } from '../types/pagination';

export class SoilReportController {
  constructor(private soilReportService: SoilReportService) {}

  /**
   * Get all soil reports with pagination
   */
  public getAllSoilReports = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const paginationParams: PaginationParams = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      };

      const [reports, total] = await this.soilReportService.findAll(paginationParams);
      
      res.status(200).json({
        data: reports,
        meta: {
          total,
          page: paginationParams.page,
          limit: paginationParams.limit
        }
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get soil report by ID
   */
  public getSoilReportById = async (
    req: Request,
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const report = await this.soilReportService.findById(id);
      
      if (!report) {
        throw new ApiError(404, 'Soil report not found');
      }

      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create new soil report
   */
  public createSoilReport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const soilReport = new SoilReport();
      Object.assign(soilReport, req.body);

      const errors = await validate(soilReport);
      if (errors.length > 0) {
        throw new ApiError(400, 'Validation failed', errors);
      }

      const newReport = await this.soilReportService.create(soilReport);
      res.status(201).json(newReport);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update existing soil report
   */
  public updateSoilReport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const existingReport = await this.soilReportService.findById(id);
      
      if (!existingReport) {
        throw new ApiError(404, 'Soil report not found');
      }

      const updatedReport = new SoilReport();
      Object.assign(updatedReport, req.body);

      const errors = await validate(updatedReport);
      if (errors.length > 0) {
        throw new ApiError(400, 'Validation failed', errors);
      }

      const result = await this.soilReportService.update(id, updatedReport);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete soil report by ID
   */
  public deleteSoilReport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const report = await this.soilReportService.findById(id);
      
      if (!report) {
        throw new ApiError(404, 'Soil report not found');
      }

      await this.soilReportService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default SoilReportController;