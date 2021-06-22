import { LoginResolver } from '../modules/resolvers/user/login/Login';
import { RegisterResolver } from '../modules/resolvers/user/register/Register';
import { MeResolver } from '../modules/resolvers/user/me/Me';
import { ConfirmUserResolver } from '../modules/resolvers/user/confirmUser/ConfirmUser';
import { ProfileResolver } from '../modules/resolvers/user/profile/ProfileResolver';
import { ForgotPasswordResolver } from '../modules/resolvers/user/forgotPassword/ForgotPassword';
import { ChangePasswordResolver } from '../modules/resolvers/user/changePassword/ChangePassword';
import { LogoutResolver } from '../modules/resolvers/user/logout/Logout';
import { buildSchema } from 'type-graphql';
import globalMiddleware from '../modules/middleware/globalMiddleware/index';
import { GraphQLSchema } from 'graphql';
export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [
      LoginResolver,
      RegisterResolver,
      MeResolver,
      ConfirmUserResolver,
      ProfileResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      LogoutResolver
    ],

    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
    globalMiddlewares: [globalMiddleware.resolveTime, globalMiddleware.logger]
  });
