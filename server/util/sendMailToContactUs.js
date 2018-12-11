import { sendMailTemplate } from './sendMailTemplate';
import serverConfig from '../config';

export const sendMailToContactUs = (candidat, subject, message) => {
  const msg = {};
  msg.content = message;
  const messageSendMail = {
    from: candidat.email,
    to: serverConfig.supportMail,
    subject,
    message: msg,
  };

  return sendMailTemplate(messageSendMail);
};
