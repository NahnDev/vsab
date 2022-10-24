import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  ExtractJwt,
  StrategyOptions,
  VerifyCallback,
  VerifiedCallback,
} from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { AccessTokenPayload } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('security.accessToken.secret'),
    });
  }
  async validate(payload: AccessTokenPayload) {
    return await this.authService.verifyAccessToken(payload);
  }
}
