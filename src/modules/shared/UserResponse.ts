import { Field, ObjectType } from 'type-graphql';
import { User } from '../../entity/User';
import { FieldError } from './errors/FieldError';
import { GeneralError } from './errors/GeneralError';

@ObjectType()
export class UserResponse {
  @Field(() => [GeneralError], { nullable: true })
  generalErrors?: GeneralError[];

  @Field(() => [FieldError], { nullable: true })
  fieldErrors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
