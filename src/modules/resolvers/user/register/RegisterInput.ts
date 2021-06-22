import { MaxLength, IsEmail, MinLength } from 'class-validator';
import { PasswordInput } from '../../../shared/PasswordInput';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';
import { IsUsernameAlreadyExist } from './IsUsernameAlreadyExists';
import {
  longInputError,
  shortInputError,
  usernameAlreadyExistsError,
  emailAlreadyExistsError
} from '../../../../modules/utils/errorMessages';

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @IsUsernameAlreadyExist({ message: usernameAlreadyExistsError })
  @MinLength(3, { message: shortInputError('username', 3) })
  @MaxLength(16, { message: longInputError('username', 16) })
  username: string;

  @Field()
  @IsEmailAlreadyExist({ message: emailAlreadyExistsError })
  @IsEmail()
  email: string;
}
