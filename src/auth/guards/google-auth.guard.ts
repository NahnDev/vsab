import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
  handleRequest(err, user, info, context, status) {
    if (err) {
      throw new UnauthorizedException(
        'Token sai rồi, lừa nhau à | the token is wrong, cheat :(',
      );
    }
    return user;
  }
}
