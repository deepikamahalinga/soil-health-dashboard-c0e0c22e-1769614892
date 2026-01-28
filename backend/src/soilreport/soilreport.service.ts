import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, SoilReport } from '@prisma/client';

@Injectable()
export class SoilReportService {
  private readonly logger = new Logger(SoilReportService.name);

  constructor(private prisma: PrismaService) {}

  // Filtering and pagination types
  interface SoilReportFilters {
    state?: string;
    district?: string;
    village?: string;
    phMin?: number;
    phMax?: number;
    startDate?: Date;
    endDate?: Date;
  }

  interface PaginationParams {
    skip?: number;
    take?: number;
  }

  async findAll(
    filters?: SoilReportFilters,
    pagination?: PaginationParams
  ): Promise<SoilReport[]> {
    try {
      const where: Prisma.SoilReportWhereInput = {};

      // Apply filters
      if (filters) {
        if (filters.state) where.state = { contains: filters.state };
        if (filters.district) where.district = { contains: filters.district };
        if (filters.village) where.village = { contains: filters.village };
        if (filters.phMin || filters.phMax) {
          where.ph = {
            gte: filters.phMin,
            lte: filters.phMax
          };
        }
        if (filters.startDate || filters.endDate) {
          where.timestamp = {
            gte: filters.startDate,
            lte: filters.endDate
          };
        }
      }

      const reports = await this.prisma.soilReport.findMany({
        where,
        skip: pagination?.skip || 0,
        take: pagination?.take || 50,
        orderBy: {
          timestamp: 'desc'
        }
      });

      this.logger.log(`Retrieved ${reports.length} soil reports`);
      return reports;

    } catch (error) {
      this.logger.error(`Error retrieving soil reports: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<SoilReport> {
    try {
      const report = await this.prisma.soilReport.findUnique({
        where: { id }
      });

      if (!report) {
        throw new NotFoundException(`Soil report with ID ${id} not found`);
      }

      this.logger.log(`Retrieved soil report with ID ${id}`);
      return report;

    } catch (error) {
      this.logger.error(`Error retrieving soil report ${id}: ${error.message}`);
      throw error;
    }
  }

  async create(data: Prisma.SoilReportCreateInput): Promise<SoilReport> {
    try {
      // Validate input
      this.validateSoilReportData(data);

      const report = await this.prisma.$transaction(async (prisma) => {
        const created = await prisma.soilReport.create({
          data
        });

        this.logger.log(`Created soil report with ID ${created.id}`);
        return created;
      });

      return report;

    } catch (error) {
      this.logger.error(`Error creating soil report: ${error.message}`);
      throw error;
    }
  }

  async update(
    id: string, 
    data: Prisma.SoilReportUpdateInput
  ): Promise<SoilReport> {
    try {
      // Check if exists
      await this.findOne(id);

      // Validate input
      this.validateSoilReportData(data);

      const updated = await this.prisma.soilReport.update({
        where: { id },
        data
      });

      this.logger.log(`Updated soil report with ID ${id}`);
      return updated;

    } catch (error) {
      this.logger.error(`Error updating soil report ${id}: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      // Check if exists
      await this.findOne(id);

      await this.prisma.soilReport.delete({
        where: { id }
      });

      this.logger.log(`Deleted soil report with ID ${id}`);

    } catch (error) {
      this.logger.error(`Error deleting soil report ${id}: ${error.message}`);
      throw error;
    }
  }

  private validateSoilReportData(data: any): void {
    if (data.ph && (data.ph < 0 || data.ph > 14)) {
      throw new Error('pH must be between 0 and 14');
    }

    if (data.nitrogen && data.nitrogen < 0) {
      throw new Error('Nitrogen value must be positive');
    }

    if (data.phosphorus && data.phosphorus < 0) {
      throw new Error('Phosphorus value must be positive');
    }

    if (data.potassium && data.potassium < 0) {
      throw new Error('Potassium value must be positive'); 
    }

    // Validate location fields length
    if (data.state && data.state.length > 100) {
      throw new Error('State name too long (max 100 chars)');
    }

    if (data.district && data.district.length > 100) {
      throw new Error('District name too long (max 100 chars)');
    }

    if (data.village && data.village.length > 100) {
      throw new Error('Village name too long (max 100 chars)');
    }
  }
}