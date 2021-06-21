import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../../entity/User";

import { sendEmail } from "../../../utils/sendEmail/sendEmail";
import { CreateForgotPasswordToken } from "../../../utils/CreateForgotPasswordToken";
import { passwordResetEmail } from "../../../templates/passwordResetEmail";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email", () => String) email: string): Promise<boolean> {
    const user = await User.findOne({ email: email });
    if (!user) return true;
    const url = await CreateForgotPasswordToken(user.id);
    const to = user.email;
    const message = passwordResetEmail(url, to);

    await sendEmail(to, url, message);
    return true;
  }
}
