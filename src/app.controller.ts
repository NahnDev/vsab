import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { PublicApi } from './decorators/public-api.decorator';
import { MailService } from './mail/mail.service';

@PublicApi()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailService: MailService,
  ) {}
}
