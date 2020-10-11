import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class GoogleMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const {
      GOOGLE_MAILING_CLIENT_ID,
      GOOGLE_MAILING_SECRET_KEY,
      GOOGLE_MAILING_REFRESH_TOKEN,
      GOOGLE_ACCESS_TOKEN,
    } = process.env;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        clientId: GOOGLE_MAILING_CLIENT_ID,
        clientSecret: GOOGLE_MAILING_SECRET_KEY,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
      auth: {
        user: from,
        refreshToken: GOOGLE_MAILING_REFRESH_TOKEN,
        accessToken: GOOGLE_ACCESS_TOKEN,
        expires: new Date().getTime(),
      },
    };

    console.log(`to: ${to}`);
    console.log(`from: ${from}`);
    console.log(`subject: ${subject}`);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: %s', info.messageId);
      }
    });
  }
}
