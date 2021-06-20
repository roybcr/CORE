import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { User } from "./entity/User";
import { redis } from "./redis/redis";
import user from "./modules/user";
import globalMiddleware from "./modules/middleware/globalMiddleware/index";

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
  const schema = await buildSchema({
    resolvers: [user.RegisterResolver, user.MeResolver, user.LoginResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
      // If user is logged in, he's considered authorized.
    },
    globalMiddlewares: [globalMiddleware.resolveTime, globalMiddleware.logger],
  });
  const apolloServer = new ApolloServer({
    schema: schema,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },

    context: ({ res, req }) => ({
      req,
      res,
      redis,
    }),
  });

  const app = express();
  app.use(cors({ origin: process.env.ORIGIN_URL_DEV, credentials: true }));
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
