import prisma from '../src/utils/prisma';

beforeAll(async () => {
    await resetDatabase();
});

afterAll(async () => {
    await prisma.$disconnect();
});

export async function resetDatabase() {
    // Clear all data but keep schema
    await prisma.$executeRawUnsafe(`
  TRUNCATE TABLE "public"."Transaction",
                  "public"."Investment",
                  "public"."Investor",
                  "public"."Fund"
  RESTART IDENTITY CASCADE;
`);
}
