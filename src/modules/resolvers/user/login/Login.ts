import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../../../../entity/User';
import { LoginInput } from './LoginInput';
import { MyContext } from '../../../constants/MyContext';
import {
  emailNotConfirmedError,
  incorrectCredentialsError
} from '../../../../modules/utils/errorMessages';
import { UserResponse } from '../../../shared/UserResponse';
@Resolver()
export class LoginResolver {
  @Mutation(() => UserResponse, { nullable: true })
  async login(
    @Arg('loginInput') { email, password }: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        generalErrors: [{ message: incorrectCredentialsError }]
      };
    }

    const isVaild = await argon2.verify(user.password, password);

    if (!isVaild) {
      return {
        generalErrors: [{ message: incorrectCredentialsError }]
      };
    }

    if (!user.confirmed) {
      return {
        generalErrors: [{ message: emailNotConfirmedError }]
      };
    }

    req.session.userId = user.id;
    return { user };
  }
}
