import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Comment } from './schemas/comment.schemas';

@WebSocketGateway()
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  async onCreate(obj: string, payload: Comment) {
    this.server.emit(`post/${obj}/comment`, payload);
  }

  async onLike(obj: string) {
    this.server.emit(`comment/${obj}/like`);
  }
}
