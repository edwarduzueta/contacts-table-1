import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

type Settings = {
  defaultContacts: Array<{
    firstName: string;
    lastName: string;
    address: string;
    image: string;
    description: string;
    owner: string;
  }>;
};

async function main() {
  console.log('Seeding the database');

  const settingsPath = path.join(process.cwd(), 'config', 'settings.development.json');
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8')) as Settings;

  for (const c of settings.defaultContacts) {
    const key = `${c.firstName} ${c.lastName}`;
    console.log(`  Adding contact: ${key}`);
    await prisma.contact.upsert({
      where: {
        firstName_lastName_owner: {
          firstName: c.firstName,
          lastName: c.lastName,
          owner: c.owner
        }
      },
      update: {
        address: c.address,
        image: c.image,
        description: c.description
      },
      create: {
        firstName: c.firstName,
        lastName: c.lastName,
        address: c.address,
        image: c.image,
        description: c.description,
        owner: c.owner
      }
    });
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
