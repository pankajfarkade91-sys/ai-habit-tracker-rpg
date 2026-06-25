import { db } from "@/prisma/client";
import { logger } from "./logger";

export async function checkHealth(): Promise<{
  status: "healthy" | "degraded" | "down";
  checks: {
    database: boolean;
    timestamp: string;
  };
}> {
  try {
    // Check database
    await db.$queryRaw`SELECT 1`;

    return {
      status: "healthy",
      checks: {
        database: true,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    logger.error(error, "Health check failed");
    return {
      status: "down",
      checks: {
        database: false,
        timestamp: new Date().toISOString(),
      },
    };
  }
}
