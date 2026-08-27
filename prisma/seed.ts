import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 เริ่มต้นการ Seed ข้อมูล...');

  // 1. Seed ข้อความติดต่อ (Messages)
  await prisma.message.createMany({
    data: [
      { name: 'Alice', email: 'a@tsu.ac.th', message: 'สวัสดี' },
      { name: 'Bob', email: 'b@tsu.ac.th', message: 'Hello' },
    ],
  });

  // 2. Seed รายการงาน (Tasks - Workshop)
  await prisma.task.createMany({
    data: [
      { title: 'เรียนรู้ Next.js API Routes', completed: true },
      { title: 'ออกแบบ Layered Architecture (Controller -> Service -> Model)', completed: true },
      { title: 'เชื่อมต่อฐานข้อมูลด้วย Prisma ORM', completed: false },
    ],
  });

  const hashed = await bcrypt.hash('1234', 10);
  
  // Seed admin user
  await prisma.user.upsert({
    where: { email: 'admin@tsu.ac.th' },
    update: {},
    create: { email: 'admin@tsu.ac.th', password: hashed },
  });

  // Seed wave regular user
  await prisma.user.upsert({
    where: { email: 'wave@gmail.com' },
    update: {},
    create: { email: 'wave@gmail.com', password: hashed },
  });

  console.log('✅ Seed ข้อมูลเสร็จเรียบร้อย!');
}

main()
  .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาดในการ Seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
