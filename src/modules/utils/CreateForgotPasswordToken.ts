import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { v4 } from "uuid";
import { redis } from "../../redis";

export const CreateForgotPasswordToken = async (userId: number) => {
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, userId, "ex", 60 * 60);
  return `http://localhost:3000/user/reset-password/${token}`;
};
