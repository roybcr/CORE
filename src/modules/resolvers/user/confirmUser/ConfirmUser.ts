import { USER_CONFIRMATION_PREFIX } from '../../../constants/constants';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../../../../entity/User';
import { MyContext } from '../../../../modules/constants/MyContext';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string, @Ctx() { redis }: MyContext): Promise<boolean> {
    const userId = await redis.get(USER_CONFIRMATION_PREFIX + token);
    console.log('userId', userId);
    if (!userId) {
      return false;
    }
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(token);
    return true;
  }
}
