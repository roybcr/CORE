import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../../entity/User";
import { ChangePasswordInput } from "./ChangePasswordInput";
import { redis } from "../../../redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";
import argon2 from "argon2";
import { MyContext } from "../../constants/MyContext";
@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("input", () => ChangePasswordInput) { token, password }: ChangePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) return null;

    const user = await User.findOne(userId);
    if (!user) return null;

    await redis.del(forgotPasswordPrefix + token);
    user.password = await argon2.hash(password);
    await user.save();

    req.session.userId = user.id; // Login the user automatically after he changes password
    return user;
  }
}
