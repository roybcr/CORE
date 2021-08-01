/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Connection, createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();
import { User } from '../entity/User';
export const testConn = (drop: boolean = false): Promise<Connection> => {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: drop,
    dropSchema: drop,
    entities: [User]
  });
};
