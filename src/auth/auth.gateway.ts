import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { SocketService } from 'src/socket/socket.service';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

@PublicApi()
@WebSocketGateway()
export class AuthGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(@ConnectedSocket() client: Socket & { user: User }) {
    if (client.handshake.auth.token) {
      await this.handleVerify(client, client.handshake.auth.token);
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket & { user: User }) {
    console.log('A client disconnect');
    if (client.user) {
      this.socketService.removeSocketForUser(client.id, client.user._id);
    }
  }

  @SubscribeMessage('verify')
  async handleVerify(
    @ConnectedSocket() client: Socket & { user: User },
    @MessageBody() payload: string,
  ) {
    const sId = client.id;
    const token = payload;
    const user = await this.authService.validateWithAccessToken(token);
    await this.socketService.registerSocketForUser(sId, user._id);
    client.user = user;
    return user;
  }
}
