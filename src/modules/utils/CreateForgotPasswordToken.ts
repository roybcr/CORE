import { FORGET_PASSWORD_PREFIX } from "../constants/constants";
import { v4 } from "uuid";
import { redis } from "../../lib/redis";

export const CreateForgotPasswordToken = async (userId: number) => {
  const token = v4();
  await redis.set(FORGET_PASSWORD_PREFIX + token, userId, "ex", 60 * 20); // OAuth reccomendation
  return `http://localhost:3000/user/reset-password/${token}`;
};
