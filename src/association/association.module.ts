import { Module } from '@nestjs/common';
import { AssociationService } from './association.service';
import { AssociationController } from './association.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Association, AssociationSchema } from './schemas/association.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Association.name,
        schema: AssociationSchema,
      },
    ]),
  ],
  controllers: [AssociationController],
  providers: [AssociationService],
})
export class AssociationModule {}
