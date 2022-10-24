import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Emit, EmitDoc } from './schemas/emit.schema';
import { SOCKET_MAP } from './socket.map';

@Injectable()
export class SocketService {
  constructor(
    @InjectModel(Emit.name) private readonly emitModel: Model<EmitDoc>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  registerSocketForUser(sId: string, uId: string) {
    SOCKET_MAP[uId] = sId;
    this.eventEmitter.emit('socket.online', uId);
  }
  removeSocketForUser(sId: string, uId: string) {
    delete SOCKET_MAP[uId];
  }

  findSocketOfUser(uId: string): string {
    return SOCKET_MAP[uId];
  }

  async addOfflineEmit(uId: string, ev: string, args: any): Promise<void> {
    const emit = new this.emitModel({ uId, ev, args });
    await emit.save();
  }
  async loadOfflineEmit(uId): Promise<Emit[]> {
    const emitDocs = await this.emitModel.find({ uId });
    return emitDocs.map((emitDoc) => emitDoc.toJSON());
  }
}
