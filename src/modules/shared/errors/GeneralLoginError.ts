import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class GeneralLoginError {
  @Field()
  message: string;
}
