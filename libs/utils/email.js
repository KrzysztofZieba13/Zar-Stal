const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = 'biuro@zar-stal.pl';
    this.url = url;
    this.from = `${user.name ?? 'Zar-Stal automatycznie'} ${user.name ? '<klient@zar-stal.pl>' : '<noreply@zar-stal.pl>'}`;
    this.user = user;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production')
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false, // do not fail on invalid certs
        }
      });
    if (process.env.NODE_ENV === 'development')
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../../views/email/${template}.pug`,
      {
        url: this.url,
        subject,
        user: this.user,
      },
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, { wordwrap: 120 }),
    };

    try {
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.error('Error sending email:', err);
    }
  }

  async sendClientAsk() {
    await this.send('client', 'Klient napisał');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Reset Hasła wwww.zar-stal.pl (ważny przez 10 minut)',
    );
  }
};
