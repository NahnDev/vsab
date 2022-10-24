import { Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendMailOptions, TransportOptions } from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-transport';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const transport: Options = {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            type: 'OAuth2',
            user: configService.get<string>('google.gmail.user'),
            refreshToken: configService.get<string>(
              'google.gmail.refreshToken',
            ),
            clientSecret: configService.get<string>(
              'google.gmail.clientSecret',
            ),
            clientId: configService.get<string>('google.gmail.clientID'),
          },
        };
        console.dir(transport);
        return { transport };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
