import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../../entity/User";

import { MyContext } from "../../constants/MyContext";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    const { userId } = req.session;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return undefined;

    return user;
  }
}
