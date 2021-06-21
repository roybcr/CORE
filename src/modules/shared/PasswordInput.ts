import { MinLength, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PasswordInput {
  @Field()
  @IsString()
  @MinLength(3)
  password: string;
}
