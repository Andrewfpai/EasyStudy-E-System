// src/students/students.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PaymentProofService {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  async addPaymentProof(studentId: number, imageUrl: string) {
    if (!imageUrl.startsWith('https://drive.google.com/')) {
      throw new Error('Invalid Google Drive link');
    }

    return this.prisma.paymentProof.create({
      data: {
        studentId,
        imageUrl,
      },
    });
  }

  async getPaymentProofs(studentId: number) {
    return this.prisma.paymentProof.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

