import { db } from "./client";
import { hash } from "bcryptjs";

async function main(): Promise<void> {
  console.log("🌱 Seeding database...");

  // Clean existing data
  console.log("🧹 Cleaning existing data...");
  await db.user.deleteMany();
  console.log("✓ Database cleaned");

  // Create demo user
  console.log("👤 Creating demo user...");
  const hashedPassword = await hash("demo@123", 12);
  const demoUser = await db.user.create({
    data: {
      email: "demo@habittracker.com",
      name: "Demo User",
      emailVerified: true,
      password: hashedPassword,
      settings: {
        create: {
          darkMode: true,
          emailNotifications: true,
          pushNotifications: true,
          language: "en",
          timezone: "UTC",
        },
      },
      stats: {
        create: {
          totalXP: 1250,
          currentLevel: 3,
          coins: 450,
          completedHabits: 45,
          currentStreak: 12,
          longestStreak: 23,
          totalHabitDays: 78,
          rank: "Initiate",
          totalStudyHours: 120,
          totalWorkoutHours: 45,
          totalWorkoutSessions: 32,
          achievementCount: 8,
        },
      },
    },
  });
  console.log("✓ Demo user created", demoUser.email);

  // Create sample habits
  console.log("📝 Creating sample habits...");
  const habits = await Promise.all([
    db.habit.create({
      data: {
        userId: demoUser.id,
        title: "Morning Meditation",
        description: "Start the day with 10 minutes of meditation",
        category: "MEDITATION",
        difficulty: "EASY",
        recurrence: "DAILY",
        xpReward: 25,
        coinReward: 10,
        reminderTime: "06:00",
        reminderEnabled: true,
      },
    }),
    db.habit.create({
      data: {
        userId: demoUser.id,
        title: "Study Programming",
        description: "Learn new programming concepts",
        category: "CODING",
        difficulty: "MEDIUM",
        recurrence: "DAILY",
        xpReward: 50,
        coinReward: 25,
        reminderTime: "14:00",
        reminderEnabled: true,
      },
    }),
    db.habit.create({
      data: {
        userId: demoUser.id,
        title: "Workout",
        description: "30 minutes of exercise",
        category: "WORKOUT",
        difficulty: "HARD",
        recurrence: "WEEKLY",
        targetDaysPerWeek: 4,
        xpReward: 100,
        coinReward: 50,
        reminderTime: "17:00",
        reminderEnabled: true,
      },
    }),
    db.habit.create({
      data: {
        userId: demoUser.id,
        title: "Read",
        description: "Read for 30 minutes",
        category: "READING",
        difficulty: "EASY",
        recurrence: "DAILY",
        xpReward: 30,
        coinReward: 15,
        reminderTime: "20:00",
        reminderEnabled: true,
      },
    }),
  ]);
  console.log(`✓ Created ${habits.length} sample habits`);

  // Create habit logs for today
  console.log("📊 Creating habit logs...");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const habit of habits) {
    await db.habitLog.create({
      data: {
        userId: demoUser.id,
        habitId: habit.id,
        date: today,
        completed: true,
        xpEarned: habit.xpReward,
        coinEarned: habit.coinReward,
      },
    });
  }
  console.log("✓ Habit logs created");

  // Create streaks
  console.log("🔥 Creating streaks...");
  for (const habit of habits) {
    await db.streak.create({
      data: {
        userId: demoUser.id,
        habitId: habit.id,
        currentCount: Math.floor(Math.random() * 15) + 1,
        longestCount: Math.floor(Math.random() * 30) + 5,
        lastLogDate: today,
        startDate: new Date(today.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log("✓ Streaks created");

  // Create sample achievements
  console.log("🏆 Creating achievements...");
  const achievements = await Promise.all([
    db.achievement.create({
      data: {
        userId: demoUser.id,
        title: "First Step",
        description: "Complete your first habit",
        rarity: "COMMON",
        unlockedAt: new Date(),
        xpReward: 50,
        coinReward: 25,
      },
    }),
    db.achievement.create({
      data: {
        userId: demoUser.id,
        title: "7-Day Warrior",
        description: "Complete a 7-day streak",
        rarity: "RARE",
        unlockedAt: new Date(),
        xpReward: 200,
        coinReward: 100,
      },
    }),
    db.achievement.create({
      data: {
        userId: demoUser.id,
        title: "Level 3 Champion",
        description: "Reach level 3",
        rarity: "EPIC",
        unlockedAt: new Date(),
        xpReward: 500,
        coinReward: 250,
      },
    }),
  ]);
  console.log(`✓ Created ${achievements.length} achievements`);

  // Create daily quests
  console.log("⚔️ Creating quests...");
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  await db.dailyQuest.create({
    data: {
      userId: demoUser.id,
      title: "Daily Warrior",
      description: "Complete 2 habits today",
      requirement: 2,
      progress: 2,
      status: "COMPLETED",
      xpReward: 100,
      coinReward: 50,
      completedAt: new Date(),
      expiresAt: tomorrow,
    },
  });

  await db.weeklyQuest.create({
    data: {
      userId: demoUser.id,
      title: "Weekly Grinder",
      description: "Complete 20 habits this week",
      requirement: 20,
      progress: 18,
      status: "ACTIVE",
      xpReward: 500,
      coinReward: 250,
      expiresAt: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  console.log("✓ Quests created");

  // Create study sessions
  console.log("📚 Creating study sessions...");
  await db.studySession.create({
    data: {
      userId: demoUser.id,
      subject: "TypeScript",
      topic: "Advanced Types",
      duration: 60,
      startTime: new Date(today.getTime() - 2 * 60 * 60 * 1000),
      endTime: new Date(today.getTime() - 1 * 60 * 60 * 1000),
      focusLevel: 8,
      pomodoroSessions: 2,
    },
  });
  console.log("✓ Study sessions created");

  // Create workout sessions
  console.log("💪 Creating workout sessions...");
  await db.workoutSession.create({
    data: {
      userId: demoUser.id,
      exerciseName: "Running",
      duration: 30,
      caloriesBurned: 300,
      intensity: "HIGH",
      startTime: new Date(today.getTime() - 3 * 60 * 60 * 1000),
      endTime: new Date(today.getTime() - 2.5 * 60 * 60 * 1000),
    },
  });
  console.log("✓ Workout sessions created");

  console.log("\n✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
