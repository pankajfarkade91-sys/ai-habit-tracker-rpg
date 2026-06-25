/**
 * Validation schemas for API requests
 */

import { z } from "zod";

// Pagination
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

// Habit validation
export const createHabitSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  category: z.enum(["STUDY", "WORKOUT", "MEDITATION", "READING", "CODING", "HEALTH", "FINANCE", "PRODUCTIVITY", "CUSTOM"]),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXTREME"]).default("MEDIUM"),
  recurrence: z.enum(["DAILY", "WEEKLY", "MONTHLY", "CUSTOM"]).default("DAILY"),
  reminderTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  xpReward: z.number().min(0).default(10),
  coinReward: z.number().min(0).default(5),
});

export const updateHabitSchema = createHabitSchema.partial();

// Habit log validation
export const createHabitLogSchema = z.object({
  habitId: z.string(),
  date: z.date(),
  completed: z.boolean(),
  notes: z.string().optional(),
});

// Study session validation
export const createStudySessionSchema = z.object({
  subject: z.string().min(1).max(255),
  topic: z.string().max(255).optional(),
  duration: z.number().min(1), // minutes
  focusLevel: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
});

// Workout session validation
export const createWorkoutSessionSchema = z.object({
  exerciseName: z.string().min(1).max(255),
  duration: z.number().min(1), // minutes
  caloriesBurned: z.number().min(0).optional(),
  intensity: z.enum(["LOW", "MEDIUM", "HIGH", "EXTREME"]).default("MEDIUM"),
  sets: z.number().min(0).optional(),
  reps: z.number().min(0).optional(),
  weight: z.number().min(0).optional(), // lbs or kg
  notes: z.string().optional(),
});

// Settings validation
export const updateSettingsSchema = z.object({
  darkMode: z.boolean().optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  dailyReminder: z.boolean().optional(),
  dailyReminderTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  accentColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
});

export type CreateHabitInput = z.infer<typeof createHabitSchema>;
export type UpdateHabitInput = z.infer<typeof updateHabitSchema>;
export type CreateHabitLogInput = z.infer<typeof createHabitLogSchema>;
export type CreateStudySessionInput = z.infer<typeof createStudySessionSchema>;
export type CreateWorkoutSessionInput = z.infer<typeof createWorkoutSessionSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
