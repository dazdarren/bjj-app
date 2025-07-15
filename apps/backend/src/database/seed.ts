import { PrismaClient, SubscriptionTier, Belt } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create demo gym
  const gym = await prisma.gym.create({
    data: {
      name: 'Elite BJJ Academy',
      slug: 'elite-bjj',
      email: 'admin@elitebjj.com',
      phone: '+1-555-0123',
      address: '123 Martial Arts Way, Fight City, FC 12345',
      subscriptionTier: SubscriptionTier.PRO,
      subscriptionStatus: 'active',
    },
  });

  console.log(`✅ Created gym: ${gym.name}`);

  // Create demo coach
  const coach = await prisma.coach.create({
    data: {
      gymId: gym.id,
      userId: 'clerk_user_demo_coach', // This would be a real Clerk user ID
      name: 'Professor Silva',
      email: 'silva@elitebjj.com',
      phone: '+1-555-0124',
    },
  });

  console.log(`✅ Created coach: ${coach.name}`);

  // Create demo members
  const members = await Promise.all([
    prisma.member.create({
      data: {
        gymId: gym.id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0101',
        belt: Belt.BLUE,
        stripes: 2,
        startDate: new Date('2023-01-15'),
        emergencyContactName: 'Jane Smith',
        emergencyContactPhone: '+1-555-0102',
      },
    }),
    prisma.member.create({
      data: {
        gymId: gym.id,
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@email.com',
        phone: '+1-555-0103',
        belt: Belt.WHITE,
        stripes: 3,
        startDate: new Date('2023-06-01'),
        emergencyContactName: 'Carlos Garcia',
        emergencyContactPhone: '+1-555-0104',
      },
    }),
    prisma.member.create({
      data: {
        gymId: gym.id,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@email.com',
        phone: '+1-555-0105',
        belt: Belt.PURPLE,
        stripes: 1,
        startDate: new Date('2022-03-10'),
        emergencyContactName: 'Sarah Johnson',
        emergencyContactPhone: '+1-555-0106',
      },
    }),
  ]);

  console.log(`✅ Created ${members.length} members`);

  // Create demo classes
  const classes = await Promise.all([
    prisma.class.create({
      data: {
        gymId: gym.id,
        coachId: coach.id,
        name: 'Fundamentals',
        description: 'Basic techniques and positions for beginners',
        dayOfWeek: 1, // Monday
        startTime: '18:30',
        endTime: '19:30',
        maxStudents: 20,
      },
    }),
    prisma.class.create({
      data: {
        gymId: gym.id,
        coachId: coach.id,
        name: 'Advanced Gi',
        description: 'Advanced techniques with the gi',
        dayOfWeek: 3, // Wednesday
        startTime: '19:00',
        endTime: '20:30',
        maxStudents: 15,
      },
    }),
    prisma.class.create({
      data: {
        gymId: gym.id,
        coachId: coach.id,
        name: 'No-Gi Competition',
        description: 'No-gi training focused on competition preparation',
        dayOfWeek: 5, // Friday
        startTime: '18:00',
        endTime: '19:30',
        maxStudents: 12,
      },
    }),
  ]);

  console.log(`✅ Created ${classes.length} classes`);

  // Create some attendance records
  const attendanceRecords = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random attendance for each member in each class
    for (const member of members) {
      for (const classItem of classes) {
        if (Math.random() > 0.3) { // 70% chance of attendance
          attendanceRecords.push({
            gymId: gym.id,
            memberId: member.id,
            classId: classItem.id,
            date,
            checkedIn: true,
          });
        }
      }
    }
  }

  await prisma.attendance.createMany({
    data: attendanceRecords,
    skipDuplicates: true,
  });

  console.log(`✅ Created ${attendanceRecords.length} attendance records`);

  // Create demo bill
  const bill = await prisma.bill.create({
    data: {
      gymId: gym.id,
      amount: 9900, // $99.00 for PRO tier
      currency: 'usd',
      status: 'paid',
      billingPeriodStart: new Date('2024-01-01'),
      billingPeriodEnd: new Date('2024-01-31'),
      activeStudents: members.length,
      overageAmount: 0,
    },
  });

  console.log(`✅ Created bill: $${bill.amount / 100}`);

  console.log('🎉 Database seeded successfully!');
  console.log('\n📊 Demo data summary:');
  console.log(`- Gym: ${gym.name} (${gym.slug})`);
  console.log(`- Coach: ${coach.name}`);
  console.log(`- Members: ${members.length}`);
  console.log(`- Classes: ${classes.length}`);
  console.log(`- Attendance records: ${attendanceRecords.length}`);
  console.log(`- Bills: 1`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });