import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/user/schemas/user.schema';
import { SocketService } from './socket.service';

@Injectable()
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  constructor(private readonly socketService: SocketService) {}
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('A client connect');
  }
  async emit(uId: string, ev: string, ...args: any) {
    console.log(uId);
    console.log(ev);
    console.log(args);
    const sId = await this.socketService.findSocketOfUser(uId);
    if (!sId) {
      this.socketService.addOfflineEmit(uId, ev, args).then();
    }
    console.log('01010');
    console.log(args);
    this.server.to(sId).emit(ev, ...args);
  }

  @OnEvent('socket.online')
  async handleSendOfflineEmit(payload: string) {
    const uId = payload;
    const emits = await this.socketService.loadOfflineEmit(uId);
    for (const emit of emits) {
      this.emit(uId, emit.ev, emit.args).then();
    }
  }
}
