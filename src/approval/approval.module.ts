import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApprovalController } from './approval.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Approval, ApprovalSchema } from './schemas/approval.schema';
import { PackageModule } from 'src/package/package.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Approval.name, schema: ApprovalSchema },
    ]),
    PackageModule,
  ],
  controllers: [ApprovalController],
  providers: [ApprovalService],
})
export class ApprovalModule {}
