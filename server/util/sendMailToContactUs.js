import sendMail from './sendMailTemplate';
import serverConfig from '../config';

export const sendMailToContactUs = (candidat, subject, message) => {
  const messageSendMail = {
    from: candidat.email,
    to: serverConfig.supportMail,
    subject,
    message,
  };

  sendMail(messageSendMail);
};
