import nodemailer from 'nodemailer';
import mailMessage from '../util/messageMailManager';
import serverConfig from '../config';
import smtpTransport from 'nodemailer-smtp-transport';
import { magicLinkHtmlMailBody } from './mail-bodies';

const baseUrl = `${serverConfig.host}:${serverConfig.portMail}${serverConfig.authentificationRoute}`;

const sendMagicLink = (candidatAurige, token) => {
  const flag = 'CHECK_OK';
  const message = mailMessage(candidatAurige, flag);
  // const INSCRIPTION_OK_MSG = `Bienvenue sur Candilib! </br>\n\r
  //   Vous êtes inscrit sur le site de réservation des candidats libres.</br>\n\r
  //   Voici votre identifiant: ${email}\n`;

  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: serverConfig.smtpServer,
      port: serverConfig.smtpPort,
      secure: false,
      tls: {
        // do not failed with selfsign certificates
        rejectUnauthorized: false,
      },
    }),
  );

  const magicLinkUrl = `${baseUrl}?token=${encodeURIComponent(token)}&redirect=calendar`;

  const mailOptions = {
    from: serverConfig.mailFrom,
    to: candidatAurige.email,
    subject: `${message.subject}`,
    text: `${message.subject}`, // TODO: Create a better alternative text body
    html: magicLinkHtmlMailBody(message.content, magicLinkUrl),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
    } else {
      console.log('MagicLink sent: ' + info.response);
      transporter.close();
    }
    transporter.close();
  });
};

export default sendMagicLink;
