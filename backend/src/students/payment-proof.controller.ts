import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { PaymentProofService } from './payment-proof.service';

@Controller('students')
export class PaymentProofController {
  constructor(private readonly PaymentProofService: PaymentProofService) {}

  @Post(':studentId/payment-proof')
  async addPaymentProof(
    @Param('studentId') studentId: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    return this.PaymentProofService.addPaymentProof(+studentId, imageUrl);
  }

  // Get all payment proofs for a student
  @Get(':studentId/payment-proof')
  async getPaymentProofs(@Param('studentId') studentId: string) {
    return this.PaymentProofService.getPaymentProofs(+studentId);
  }


}
