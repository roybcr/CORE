import { LoginResolver } from './login/Login';
import { RegisterResolver } from './register/Register';
import { MeResolver } from './me/Me';
import { ConfirmUserResolver } from './confirmUser/ConfirmUser';
import { ProfileResolver } from './profile/ProfileResolver';
import { ForgotPasswordResolver } from './forgotPassword/ForgotPassword';
import { ChangePasswordResolver } from './changePassword/ChangePassword';
import { LogoutResolver } from './logout/Logout';
import { ResendConfirmationEmailResolver } from './resendConfirmationEmail/ResendConfiirmationEmail';
export default {
  LoginResolver,
  RegisterResolver,
  MeResolver,
  ConfirmUserResolver,
  ProfileResolver,
  ForgotPasswordResolver,
  ChangePasswordResolver,
  LogoutResolver,
  ResendConfirmationEmailResolver
};
