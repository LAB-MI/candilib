import nodemailer from 'nodemailer';
import mailMessage from '../util/messageMailManager';
import smtpTransport from 'nodemailer-smtp-transport';
import mailConfig from '../config';
import { htmlMailBody } from './mail-bodies';

const sendMailToAccount = (candidatAurige, flag) => {
  const message = mailMessage(candidatAurige, flag);

  const transporter = nodemailer.createTransport(smtpTransport({
    host: mailConfig.smtpServer,
    port: mailConfig.smtpPort,
    secure: false,
    tls: {
      // do not failed with selfsign certificates
      rejectUnauthorized: false,
    },
  }));

  const mailOptions = {
    from: mailConfig.mailFrom,
    to: candidatAurige.email,
    subject: `${message.subject}`,
    text: `${message.subject}`, // TODO: Create a better alternative text body
    html: htmlMailBody(message.content),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
    } else {
      console.log('Mail sent: ' + info.response);
      transporter.close();
    }
    transporter.close();
  });
};

export default sendMailToAccount;
