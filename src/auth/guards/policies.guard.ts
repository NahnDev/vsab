import { PUBLIC_API_KEY } from 'src/constants/PUBLIC_API_KEY';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from 'src/constants/CHECK_POLICIES_KEY';
import { PolicyHandler } from 'src/casl/policy-handler';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { pid } from 'src/constants/PID';
import { Scope } from '../scopes/scope.class';
import { EXTRACT_DATA_KEY } from 'src/decorators/extract-scope.decorator';
import {
  defaultExtractScopeCallback,
  ExtractScopeCallback,
} from '../scopes/extract-scope-callback';
import { JwtAuthGuard } from './jwt-auth.guard';
import { WsAuthGuard } from './ws-auth.guard';
import { Socket } from 'socket.io';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtAuthGuard: JwtAuthGuard,
    private socketService: SocketService,
    private caslAbilityFactory: CaslAbilityFactory,
    protected reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicApi = this.reflector.getAllAndOverride(PUBLIC_API_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicApi) return true;

    // get user and scope from user
    let user: User;
    let scope: Scope;
    const hostType = context.getType();
    switch (hostType) {
      case 'http': {
        if (!(await this.jwtAuthGuard.canActivate(context))) return false;
        const req = context.switchToHttp().getRequest();
        user = req.user as User;
        scope = {
          project: (req as Request).params[pid],
        };
        break;
      }

      case 'ws': {
        const extractScopeCallback =
          this.reflector.getAllAndOverride<ExtractScopeCallback>(
            EXTRACT_DATA_KEY,
            [context.getClass(), context.getHandler()],
          ) || defaultExtractScopeCallback;

        user = (context.switchToWs().getClient() as Socket & { user: User })
          .user;
        scope = extractScopeCallback(context.switchToWs().getData());
        break;
      }
      case 'rpc': {
        console.log(` support rpc connect yet`);
        return false;
      }
      default:
        break;
    }

    // console.log(user);
    if (!user) return false;

    // console.log(' --------------- Authorization for user');
    // console.log(user);
    // console.log(' --------------- Authorization for scope');
    // console.log(scope);
    // user.roles = await this.authService.getUserRole(user, scope);
    const ability = this.caslAbilityFactory.createForUser(user);
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
