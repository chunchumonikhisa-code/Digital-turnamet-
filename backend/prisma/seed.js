const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Create 8 Divisions
  const divisions = [
    { name: 'Dhaka', bn_name: 'ঢাকা' },
    { name: 'Chattogram', bn_name: 'চট্টগ্রাম' },
    { name: 'Rajshahi', bn_name: 'রাজশাহী' },
    { name: 'Khulna', bn_name: 'খুলনা' },
    { name: 'Barishal', bn_name: 'বরিশাল' },
    { name: 'Sylhet', bn_name: 'সিলেট' },
    { name: 'Rangpur', bn_name: 'রংপুর' },
    { name: 'Mymensingh', bn_name: 'ময়মনসিংহ' },
  ];

  for (const div of divisions) {
    await prisma.division.upsert({
      where: { name: div.name },
      update: {},
      create: div,
    });
  }

  // 2. Create 64 Districts (Shorter list for example - add all 64)
  const districts = [
    // Dhaka Division
    { name: 'Dhaka', bn_name: 'ঢাকা', divisionId: 1 },
    { name: 'Gazipur', bn_name: 'গাজীপুর', divisionId: 1 },
    { name: 'Narayanganj', bn_name: 'নারায়ণগঞ্জ', divisionId: 1 },
    // Chattogram Division
    { name: 'Chattogram', bn_name: 'চট্টগ্রাম', divisionId: 2 },
    { name: 'Cox\'s Bazar', bn_name: 'কক্সবাজার', divisionId: 2 },
    // Rajshahi Division
    { name: 'Rajshahi', bn_name: 'রাজশাহী', divisionId: 3 },
    // ... (Add all 64 districts here for production)
  ];

  for (const dist of districts) {
    await prisma.district.upsert({
      where: { name: dist.name },
      update: {},
      create: dist,
    });
  }

  console.log('✅ Bangladesh Divisions & Districts Seeded!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
