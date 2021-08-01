import { redis } from '../../lib/redis';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { USER_CONFIRMATION_PREFIX } from '../constants/constants';
dotenv.config();
export const createConfirmationUrl = async (userId: number): Promise<string> => {
  const token = v4();
  await redis.set(USER_CONFIRMATION_PREFIX + token, userId, 'ex', 60 * 60 * 24);
  return process.env.CORS_ORIGIN + `/user/confirm/${token}`;
};
