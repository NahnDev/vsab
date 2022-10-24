import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { AccessTokenPayload } from '../auth.interface';
import { AuthService } from '../auth.service';

// dung de xac thuc nguoi dung khi connect user
@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket = context.switchToWs().getClient() as Socket;
    const data = context.switchToWs().getData() as { jwt: string };
    const token = socket.handshake.headers.authorization || data.jwt;
    const payload = verify(
      token,
      this.configService.get<string>('security.accessToken.secret'),
    ) as AccessTokenPayload;
    const user = await this.authService.verifyAccessToken(payload);
    context.switchToWs().getClient().user = user;
    return true;
  }
}
