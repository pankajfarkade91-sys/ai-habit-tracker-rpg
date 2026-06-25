import { z } from "zod";

const envSchema = z.object({
  // App
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Habit Tracker RPG"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_DEBUG: z.string().transform((val) => val === "true").default("false"),

  // Database
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  DATABASE_URL_SHADOW: z.string().url().startsWith("postgresql://").optional(),

  // Redis
  REDIS_URL: z.string().url().optional(),
  REDIS_PASSWORD: z.string().optional(),

  // Authentication
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // AI
  GEMINI_API_KEY: z.string().optional(),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // Monitoring
  SENTRY_AUTH_TOKEN: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),

  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_AI_COACH: z.string().transform((val) => val === "true").default("true"),
  NEXT_PUBLIC_ENABLE_LEADERBOARDS: z.string().transform((val) => val === "true").default("false"),
  NEXT_PUBLIC_ENABLE_SOCIAL: z.string().transform((val) => val === "true").default("false"),
  NEXT_PUBLIC_ENABLE_PREMIUM: z.string().transform((val) => val === "true").default("false"),
  NEXT_PUBLIC_ENABLE_PWA: z.string().transform((val) => val === "true").default("true"),

  // API
  API_RATE_LIMIT_REQUESTS: z.string().transform(Number).default("100"),
  API_RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default("900000"),
  API_TIMEOUT_MS: z.string().transform(Number).default("30000"),

  // Logging
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug", "trace"]).default("info"),
});

type Env = z.infer<typeof envSchema>;

let env: Env;

function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("\n❌ Environment validation failed:");
      error.errors.forEach((err) => {
        console.error(`  • ${err.path.join(".")}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
}

if (!env) {
  env = validateEnv();
}

export { env };
