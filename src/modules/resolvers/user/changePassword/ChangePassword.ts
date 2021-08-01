import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../../entity/User';
import { ChangePasswordInput } from './ChangePasswordInput';
import { FORGET_PASSWORD_PREFIX } from '../../../constants/constants';
import argon2 from 'argon2';
import { MyContext } from '../../../constants/MyContext';
@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('input', () => ChangePasswordInput)
    { token, password }: ChangePasswordInput,
    @Ctx() { req, redis }: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
    if (!userId) return null;

    const user = await User.findOne(userId);
    if (!user) return null;

    await redis.del(FORGET_PASSWORD_PREFIX + token);
    user.password = await argon2.hash(password);
    await user.save();

    req.session.userId = user.id; // To log the user in right after he changes password
    return user;
  }
}
