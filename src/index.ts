import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { createConnection, getConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { User } from './entity/User';
import { redis } from './lib/redis';
import { createSchema } from './lib/createSchema';
import { getComplexity, fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';
import { COOKIE_NAME, REDIS_SESSION_PREFIX, __prod__ } from './modules/constants/constants';
import { logManager } from './lib/logManager';
import { setupErrorHandling } from './lib/shutdown';

dotenv.config();
const logger = logManager();

logger.info('Loading environment...');
const bootstrap = async () => {
  logger.info('Connecting database...');
  await createConnection({
    type: 'postgres',
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [User]
  }).then((connection) => {
    if (connection.isConnected) {
      logger.info('database connected');
    } else {
      logger.info('no connection');
    }
  });

  logger.info('building schema...');
  const PORT = process.env.PORT;
  const schema = await createSchema();
  logger.info('Creating express server...');
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
    })
  );

  const RedisStore = connectRedis(session);

  logger.info('Creating GQL server...');
  const apolloServer = new ApolloServer({
    schema: schema,

    context: ({ res, req }) => ({
      req,
      res,
      redis
    }),
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,

              estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })]
            });
            if (complexity > 20) {
              throw new Error(
                `${request.operationName} Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`
              );
            }

            console.debug(`Used query complexity points:, ${complexity}`);
          }
        })
      }
    ]
  });

  logger.info('Initializing new session');
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true, prefix: REDIS_SESSION_PREFIX }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__
      },
      secret: process.env.COOKIE_SECRET as string[] | 'e3h92h98fhhe8hs883h',
      resave: false,
      saveUninitialized: false
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: __prod__ ? 'https://linity.io' : process.env.CORS_ORIGIN,
      credentials: true
    }
  });

  const nodeServer = app.listen(PORT, () => {
    logger.info(`Server ready on port: ${PORT}`);
  });

  setupErrorHandling({
    db: getConnection(),
    logger: logger,
    nodeServer: nodeServer
  });
};

bootstrap();
