import { graphql } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "../lib/createSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
}
export const gqlCall = async ({ source, variableValues }: Options) => {
  return graphql({
    schema: await createSchema(),
    source,
    variableValues,
  });
};
