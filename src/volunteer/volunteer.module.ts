import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Volunteer, VolunteerSchema } from './schemas/volunteer.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Volunteer.name,
        useFactory: () => {
          const schema = VolunteerSchema;
          schema.index({ user: 1, event: 1 }, { unique: true });
          return schema;
        },
      },
    ]),
  ],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService],
})
export class VolunteerModule {}
