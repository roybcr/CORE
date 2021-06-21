import { IEmailTemplate } from "../../types/Email";

export const passwordResetEmail = (url: string, to: string): IEmailTemplate => {
  return {
    to: `<${to}>`,
    subject: "We got your request to change your password!",
    text: "Just so you know: you have 24 hours to pick your password. After that, you'll have to ask for a new one.",
    html: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px; border: 1px solid #f0f2f5; border-radius: 4px; background-color: #fff height: 100%; align-content: center;">
    <h3 style="color: #1c1c1e; text-align: center; margin-bottom: 10px">
     We got your request to change your password!
    </h3>
    <h5 style="color: #1c1c1e; text-align: center; margin-bottom: 16px width: 100%; max-width: 450px"> 
    Just so you know: you have 24 hours to pick your password. After that, you'll have to ask for a new one.
    </h5>
    <a href="${url}" style="text-decoration: none;  vertical-align: middle; color: #fff; width: 100%; height: 100%;">
    <div style="padding-left: 12px; padding-right: 12px; padding-bottom: 6px; padding-top: 6px; border-radius: 3px; color: #fff; text-align: center; display: flex; align-items: center; font-weight: 500; font-size: 13px; justify-content: center; text-align: center; letter-spacing: 0.1em; width: 400px; height: 32px; background-color: #5a07ff; justify-self: center; align-self: center;">
    Reset password
    </div>
    </a>
    </div>
    `,
  };
};
