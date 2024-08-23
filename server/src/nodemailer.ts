import { createTransport } from 'nodemailer';
import {
  nodemailerFromEmail,
  nodemailerToEmail,
  oauthAccessToken,
  oauthClientId,
  oauthClientSecret,
  oauthRefreshToken,
} from './config';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: nodemailerFromEmail,
    clientId: oauthClientId,
    clientSecret: oauthClientSecret,
    refreshToken: oauthRefreshToken,
    accessToken: oauthAccessToken,
  },
});

export const sendMail = (subject: string, text: string) => {
  transporter.sendMail(
    {
      from: nodemailerFromEmail,
      to: nodemailerToEmail,
      subject,
      text,
    },
    (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(info);
      }
    }
  );
};
