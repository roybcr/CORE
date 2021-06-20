import { MiddlewareFn } from "type-graphql";

export const resolveTime: MiddlewareFn = async ({ info }, next) => {
  const start = Date.now();
  await next();
  const time = Date.now() - start;
  console.log(`${info.parentType.name}.${info.fieldName} [${time} ms]`);
};
