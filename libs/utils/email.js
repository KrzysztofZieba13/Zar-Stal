const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = 'noreply@zar-stal.pl';
    this.url = url;
    this.from = `Test`;
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
      });
    if (process.env.NODE_ENV === 'development')
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  }

  async send(template, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: `Email: ${this.user.data.email} Telefon: ${this.user.data.phone}, Wiadomość: ${this.user.data.message}`,
    };

    try {
      const info = await this.newTransport().sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
    } catch (err) {
      console.error('Error sending email:', err);
    }
  }

  async sendHelloWorld() {
    await this.send('Hello world', 'Witaj Świecie');
  }
};
