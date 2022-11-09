import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { PostModule } from 'src/post/post.module';
import { PackageModule } from 'src/package/package.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),

    PostModule,
    PackageModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
