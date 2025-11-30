import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding production database...\n');

  // Run both seed scripts
  try {
    console.log('📚 Seeding Introduction to Python...');
    await import('./update-intro.js');
    console.log('✅ Introduction to Python seeded\n');

    console.log('🤖 Seeding Machine Learning lesson...');
    await import('./update-ml-lesson.js');
    console.log('✅ Machine Learning lesson seeded\n');

    console.log('✅ All lessons seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
