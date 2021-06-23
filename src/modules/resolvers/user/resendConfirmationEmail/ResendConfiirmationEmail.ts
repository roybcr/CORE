import { Arg, Query, Resolver } from 'type-graphql';
import { User } from '../../../../entity/User';
import { sendEmail } from '../../../utils/sendEmail/sendEmail';
import { createConfirmationUrl } from '../../../utils/createConfirmationUrl';

@Resolver()
export class ResendConfirmationEmailResolver {
  @Query(() => Boolean)
  async resendConfirmationEmail(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({
      where: {
        email: email
      },
      select: ['id', 'confirmed']
    });
    console.log('user', user);
    if (!user) {
      return false;
    }
    if (user && user.confirmed) {
      return false;
    }

    await sendEmail(email, await createConfirmationUrl(user.id));
    return true;
  }
}
