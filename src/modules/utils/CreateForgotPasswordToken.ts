import { FORGET_PASSWORD_PREFIX } from '../constants/constants';
import { v4 } from 'uuid';
import { redis } from '../../lib/redis';
import dotenv from 'dotenv';
dotenv.config();
export const CreateForgotPasswordToken = async (userId: number): Promise<string> => {
  const token = v4();
  await redis.set(FORGET_PASSWORD_PREFIX + token, userId, 'ex', 60 * 20); // OAuth reccomendation
  return process.env.CORS_ORIGIN + `/user/reset-password/${token}`;
};
