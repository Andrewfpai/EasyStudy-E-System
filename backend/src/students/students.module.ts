import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PaymentProofController } from './payment-proof.controller';
import { PaymentProofService } from './payment-proof.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [StudentsController, PaymentProofController],
  providers: [StudentsService, PaymentProofService],
})
export class StudentsModule {}