import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Association } from 'src/association/schemas/association.schema';
import { Post } from './schemas/post.schema';

@WebSocketGateway()
export class PostGateway {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('message')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  //   this.ser
  // }
  async onCreated(obj: Association['_id'], payload: Post) {
    this.server.emit(`association/${obj}/post`, payload);
  }

  async onLike(obj: Post['_id']) {
    this.server.emit(`post/${obj}/like`);
  }
}
