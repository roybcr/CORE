import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class GeneralError {
  @Field()
  message: string;
}
