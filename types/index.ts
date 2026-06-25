// Common types used across the application

export type Maybe<T> = T | null | undefined;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type HabitCategory =
  | "STUDY"
  | "WORKOUT"
  | "MEDITATION"
  | "READING"
  | "CODING"
  | "HEALTH"
  | "FINANCE"
  | "PRODUCTIVITY"
  | "CUSTOM";

export type HabitDifficulty = "EASY" | "MEDIUM" | "HARD" | "EXTREME";

export type RecurrenceType = "DAILY" | "WEEKLY" | "MONTHLY" | "CUSTOM";

export interface HabitData {
  id: string;
  title: string;
  description?: string;
  category: HabitCategory;
  difficulty: HabitDifficulty;
  xpReward: number;
  coinReward: number;
  completionRate?: number;
  currentStreak?: number;
}

export interface UserStats {
  totalXP: number;
  currentLevel: number;
  coins: number;
  rank: string;
  completedHabits: number;
  missedHabits: number;
}

export type UserRole = "user" | "admin" | "moderator";

export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  };
  expires: string;
}
