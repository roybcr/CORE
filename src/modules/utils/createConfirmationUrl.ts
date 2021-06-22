import { redis } from "../../lib/redis";
import { v4 } from "uuid";
import { USER_CONFIRMATION_PREFIX } from "../constants/constants";

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  await redis.set(USER_CONFIRMATION_PREFIX + token, userId, "ex", 60 * 60 * 24);
  return `http://localhost:3000/user/confirm/${token}`;
};
