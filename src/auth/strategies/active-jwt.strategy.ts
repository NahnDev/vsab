import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ACTIVE_TOKEN_QUERY } from 'src/constants/ACTIVE_TOKEN_QUERY';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ActiveJwtStrategy extends PassportStrategy(
  Strategy,
  'active-jwt',
) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter(ACTIVE_TOKEN_QUERY),
      secretOrKey: configService.get<string>('security.activeToken.secret'),
    });
  }
  async validate(payload: any) {
    // console.log(payload);
    return payload;
  }
}
