import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, FollowSchema } from './schemas/follow.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Follow.name,
        useFactory: () => {
          const schema = FollowSchema;
          schema.index({ association: 1, user: 1 }, { unique: true });
          return schema;
        },
      },
    ]),
  ],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
