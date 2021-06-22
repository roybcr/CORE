import { MyContext } from '../../../constants/MyContext';
import { Resolver, Mutation, Ctx } from 'type-graphql';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((resolve, reject) =>
      ctx.req.session.destroy((err) => {
        if (err) {
          return reject(err);
        }

        ctx.res.clearCookie('qid');
        resolve(true);
      })
    );
  }
}
