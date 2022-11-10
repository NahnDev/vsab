import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './schemas/member.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Member.name,
        useFactory: () => {
          const schema = MemberSchema;
          schema.index({ user: 1, association: 1 }, { unique: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
