import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}
  sendTestEmail() {
    this.mailer
      .sendMail({
        to: 'games.thanhnhan.mientay@gmail.com',
        from: 'NLN OT task <thanhnhan.mientay@gmail.com>',
        html: ` <a href="https://fb.com">THis is test<div>`,
      })
      .then();
  }

  sendActiveEmail(to: string, link: string) {
    console.log(`Send email to ${to} : ${link}`);
    this.mailer.sendMail({
      to,
      from: 'NLN OT task <nhan.thanhnhan@gmail.com>',
      subject: 'Verify account ',
      html: ` <div> Link co han day, bao lau quen roi: <a href="${link}"> Nhan vao day</a></div>`,
    });
  }
}
