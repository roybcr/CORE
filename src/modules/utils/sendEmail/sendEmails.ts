import { IEmailRecievers } from '../../../types/Email';
import { sendEmail } from './sendEmail';

export async function sendEmails({ emails }: IEmailRecievers): Promise<void> {
  const promises = [];
  for (let i = 0; i < emails.length; i++) {
    promises.push(sendEmail(emails[i], ''));
  }

  await Promise.all(promises);
}
