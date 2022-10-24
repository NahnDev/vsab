import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WsAuthGuard } from './auth/guards/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('connection')
  handleVerify() {
    console.log('A client connect to server');
  }
}
