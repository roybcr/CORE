import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import argon2 from "argon2";
import { User } from "../../../entity/User";
import { RegisterInput } from "./RegisterInput";

@Resolver()
export class RegisterResolver {
  @Authorized()
  @Query(() => String)
  async hello(): Promise<string> {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg("registerInput") { username, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    }).save();

    return user;
  }
}
