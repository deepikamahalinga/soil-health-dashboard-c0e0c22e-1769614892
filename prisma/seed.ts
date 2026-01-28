import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  try {
    await prisma.soilReport.deleteMany({});
    console.log('Cleared existing soil report records');
  } catch (error) {
    console.error('Error clearing existing data:', error);
    throw error;
  }

  // Sample data
  const soilReports = [
    {
      id: uuidv4(),
      state: 'Maharashtra',
      district: 'Pune',
      village: 'Wagholi',
      ph: 6.5,
      nitrogen: 280.50,
      phosphorus: 45.20,
      potassium: 190.75,
      timestamp: new Date()
    },
    {
      id: uuidv4(), 
      state: 'Karnataka',
      district: 'Belgaum',
      village: 'Sankeshwar',
      ph: 7.2,
      nitrogen: 320.25,
      phosphorus: 52.80,
      potassium: 210.40,
      timestamp: new Date()
    },
    {
      id: uuidv4(),
      state: 'Punjab',
      district: 'Ludhiana',
      village: 'Sahnewal',
      ph: 7.8,
      nitrogen: 425.60,
      phosphorus: 62.30,
      potassium: 245.90,
      timestamp: new Date()
    },
    {
      id: uuidv4(),
      state: 'Gujarat',
      district: 'Ahmedabad',
      village: 'Sanand',
      ph: 7.1,
      nitrogen: 295.40,
      phosphorus: 48.90,
      potassium: 185.60,
      timestamp: new Date()
    },
    {
      id: uuidv4(),
      state: 'Madhya Pradesh',
      district: 'Indore',
      village: 'Depalpur',
      ph: 6.8,
      nitrogen: 310.20,
      phosphorus: 51.40,
      potassium: 205.80,
      timestamp: new Date()
    },
    {
      id: uuidv4(),
      state: 'Uttar Pradesh',
      district: 'Agra',
      village: 'Fatehpur Sikri',
      ph: 7.4,
      nitrogen: 340.80,
      phosphorus: 55.60,
      potassium: 225.30,
      timestamp: new Date()
    },
    {
      id: uuidv4(),
      state: 'Bihar',
      district: 'Patna',
      village: 'Danapur',
      ph: 6.9,
      nitrogen: 290.40,
      phosphorus: 47.80,
      potassium: 195.40,
      timestamp: new Date()
    }
  ];

  try {
    // Insert soil reports
    const createdReports = await prisma.soilReport.createMany({
      data: soilReports
    });

    console.log(`Successfully created ${createdReports.count} soil reports`);

  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}

main()
  .catch((error) => {
    console.error('Error in seed script:', error);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma client
    await prisma.$disconnect();
    console.log('Seed completed. Database connection closed.');
  });