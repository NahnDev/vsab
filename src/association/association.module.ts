import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Association, AssociationSchema } from './schemas/association.schema';
import { FollowModule } from 'src/follow/follow.module';
import { MemberModule } from 'src/member/member.module';
import { RoleModule } from 'src/role/role.module';
import { AssociationGateway } from './association.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Association.name,
        schema: AssociationSchema,
      },
    ]),
    FollowModule,
    RoleModule,
    MemberModule,
  ],
  controllers: [AssociationController],
  providers: [AssociationService, AssociationGateway],
})
export class AssociationModule {}
