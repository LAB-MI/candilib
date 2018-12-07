import mailMessage from '../util/messageMailManager';
import serverConfig from '../config';
import { sendMail } from './sendMailTemplate';

const sendMailToAccount = (candidatAurige, flag) => {
  const message = mailMessage(candidatAurige, flag);

  message.from = serverConfig.mailFrom;
  message.to = candidatAurige.email;

  sendMail(message);
};

export default sendMailToAccount;
