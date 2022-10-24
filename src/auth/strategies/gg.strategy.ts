import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { profile } from 'console';
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('google.login.clientID'),
      clientSecret: configService.get<string>('google.login.clientSecret'),
      callbackURL: configService.get<string>('google.login.callbackUrl'),
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { displayName, emails } = profile;
    // console.log(emails[0].value, displayName);
    const user: User = await this.authService.validateWithGoogle(
      emails[0].value,
      displayName,
    );
    return user;
  }
}
