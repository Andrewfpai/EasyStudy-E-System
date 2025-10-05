import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { PaymentProofController } from './payment-proof.controller';
import { PaymentProofService } from './payment-proof.service';

@Module({
  controllers: [StudentsController, PaymentProofController],
  providers: [StudentsService, PaymentProofService],
})
export class StudentsModule {}
