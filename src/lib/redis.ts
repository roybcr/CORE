import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();
export const redis = new Redis(process.env.REDIS_2_PORT);

export function closeInstance(callback: () => void) {
  redis.quit(callback);
}
