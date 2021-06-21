import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { User } from "./entity/User";
import { redis } from "./redis";
import { createSchema } from "./lib/createSchema";
dotenv.config();

const bootstrap = async () => {
  await createConnection({
    type: "postgres",
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User],
  });

  const PORT = process.env.PORT;
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema: schema,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    /* uploads: { maxFileSize: 10000000, maxFiles: 10 }, */

    context: ({ res, req }) => ({
      req,
      res,
      redis,
    }),
  });

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    helmet({ contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false })
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: new RedisStore({ client: redis as any, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      secret: process.env.COOKIE_SECRET as string[] | "e3h92h98fhhe8hs883h",
      resave: false,
      saveUninitialized: false,
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  app.listen(PORT, () => {
    console.log(`🪐  Server listening on port: ${PORT} 🪐`);
  });
};

bootstrap();
