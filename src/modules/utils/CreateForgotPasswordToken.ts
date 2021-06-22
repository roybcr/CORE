import { FORGET_PASSWORD_PREFIX } from "../constants/constants";
import { v4 } from "uuid";
import { Redis } from "ioredis";

export const CreateForgotPasswordToken = async (userId: number, redis: Redis) => {
  const token = v4();
  await redis.set(FORGET_PASSWORD_PREFIX + token, userId, "ex", 60 * 20); // OAuth reccomendation
  return `http://localhost:3000/user/reset-password/${token}`;
};
