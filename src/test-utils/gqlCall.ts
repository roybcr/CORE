/* eslint-disable @typescript-eslint/no-explicit-any */

import { ExecutionResult, graphql, GraphQLSchema } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { createSchema } from '../lib/createSchema';

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  userId?: number;
}
let schema: GraphQLSchema;

export const gqlCall = async ({
  source,
  variableValues,
  userId
}: Options): Promise<ExecutionResult<{ [key: string]: any }, { [key: string]: any }>> => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId
        }
      },
      res: {
        clearCookie: jest.fn()
      }
    }
  });
};
