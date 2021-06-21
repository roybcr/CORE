import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import argon2 from "argon2";
import { User } from "../../../entity/User";
import { RegisterInput } from "./RegisterInput";
import { isAuth } from "../../middleware/UserMiddleware/isAuth";
import { sendEmail } from "../../utils/sendEmail/sendEmail";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  hello(): string {
    return "Hello World!";
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
    await sendEmail(email, await createConfirmationUrl(user.id));
    return user;
  }
}
