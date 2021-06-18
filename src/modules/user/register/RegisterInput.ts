import { MaxLength, IsEmail, IsString, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";
import { IsUsernameAlreadyExist } from "./IsUsernameAlreadyExists";

@InputType()
export class RegisterInput {
  @Field()
  @IsUsernameAlreadyExist({ message: "Someone already has that username. Try another?" })
  @MinLength(3, { message: "username must be longer than or equal to 3 characters" })
  @MaxLength(16, { message: "username must be shorter than or equal to 16 characters" })
  username: string;

  @Field()
  @IsEmailAlreadyExist({ message: "It looks like there's already an account with this email." })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
