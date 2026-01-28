import { PrismaClient } from '@prisma/client';
import { Logger } from './logger'; // Assuming a logger implementation exists

class PrismaService {
  private static instance: PrismaService;
  private prisma: PrismaClient;
  private logger: Logger;
  private isConnected: boolean = false;

  private constructor() {
    this.logger = new Logger('PrismaService');
    this.prisma = new PrismaClient({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    });

    // Add logging middleware
    this.prisma.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      this.logger.debug(`Query ${params.model}.${params.action} took ${after - before}ms`);
      return result;
    });

    // Setup logging handlers
    this.prisma.$on('query', (e: any) => {
      this.logger.debug(`Query: ${e.query}`);
    });
    this.prisma.$on('error', (e: any) => {
      this.logger.error(`Database error: ${e.message}`);
    });
    this.prisma.$on('warn', (e: any) => {
      this.logger.warn(`Database warning: ${e.message}`);
    });
    this.prisma.$on('info', (e: any) => {
      this.logger.info(`Database info: ${e.message}`);
    });
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  public get client(): PrismaClient {
    return this.prisma;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.isConnected) {
        await this.prisma.$connect();
        this.isConnected = true;
        this.logger.info('Successfully connected to database');
      }
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      if (this.isConnected) {
        await this.prisma.$disconnect();
        this.isConnected = false;
        this.logger.info('Successfully disconnected from database');
      }
    } catch (error) {
      this.logger.error('Error disconnecting from database', error);
      throw error;
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Database health check failed', error);
      return false;
    }
  }

  public async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        
        this.logger.warn(
          `Database operation failed, attempt ${attempt} of ${maxRetries}`,
          error
        );
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt), 10000))
        );
      }
    }
    throw new Error('Unreachable code');
  }
}

// Export singleton instance
export const prismaService = PrismaService.getInstance();
export const prisma = prismaService.client;

// Handle process termination
process.on('beforeExit', async () => {
  await prismaService.disconnect();
});