import pino from "pino";
import { env } from "./env";

const isDev = env.NODE_ENV === "development";
const isDebug = env.NEXT_PUBLIC_DEBUG;

const pinoConfig = {
  level: env.LOG_LEVEL,
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          singleLine: false,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
};

const logger = pino(pinoConfig);

export { logger };

// Usage examples:
// logger.info({ data }, "message")
// logger.error({ data }, "message")
// logger.warn({ data }, "message")
// logger.debug({ data }, "message")
