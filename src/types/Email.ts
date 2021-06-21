export type Email = string;
export type IEmailRecievers = {
  emails: Email[];
};

export interface IEmailTemplate {
  to: string;
  subject: string;
  text: string;
  html: string;
}
