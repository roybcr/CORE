import { MyContext } from 'src/modules/constants/MyContext';
import { MiddlewareFn } from 'type-graphql';

export const logger: MiddlewareFn<MyContext> = async ({ args }, next) => {
  if (Object.entries(args).length > 0) {
    console.log('args: ', args);
  }

  return next();
};
