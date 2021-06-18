import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { User } from "../../../entity/User";
import { LoginInput } from "./LoginInput";
import { MyContext } from "../../../types/MyContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("loginInput") { email, password }: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isVaild = await argon2.verify(user.password, password);
    if (!isVaild) return null;

    req.session.userId = user.id;
    return user;
  }
}