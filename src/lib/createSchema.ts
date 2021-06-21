import { buildSchema } from "type-graphql";
import path from "path";
import globalMiddleware from "../modules/middleware/globalMiddleware/index";
export const createSchema = () =>
  buildSchema({
    resolvers: [path.join(__dirname + "/../modules/resolvers/*/*.js")],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
    globalMiddlewares: [globalMiddleware.resolveTime, globalMiddleware.logger],
  });
