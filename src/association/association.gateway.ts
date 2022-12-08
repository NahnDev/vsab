import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Post } from 'src/post/schemas/post.schema';

@WebSocketGateway()
export class AssociationGateway {
  @WebSocketServer()
  server: Server;

  async onPosts(obj: string, payload: Post) {
    this.server.emit(`association/${obj}/post`, payload);
  }
}
