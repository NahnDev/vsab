import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Emit, EmitSchema } from './schemas/emit.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Emit.name, schema: EmitSchema }]),
  ],
  providers: [SocketService, SocketGateway],
  exports: [SocketService, SocketGateway],
})
export class SocketModule {}
