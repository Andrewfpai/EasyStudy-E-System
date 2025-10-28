// src/students/students.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import pinyin from 'pinyin';

@Injectable()
export class StudentsService {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  // Fetch all students with payments & token usage history
  getAllStudents() {
    return this.prisma.student.findMany({
      include: {
        payments: true,
        tokenUsageHistory: {
          orderBy: { createdAt: 'desc' }, // most recent first
        },
      },
    });
  }

  // Create a new student
  createStudent(data: any) {
    const pinyinName = data.hanziName
      ? pinyin(data.hanziName, { style: pinyin.STYLE_NORMAL, heteronym: false })
          .flat()
          .join(' ')
      : null;

    return this.prisma.student.create({
      data: {
        ...data,
        ...(pinyinName ? { pinyinName } : {}),
        joinedDate: data.joinedDate ? new Date(data.joinedDate) : undefined,
      },
    });
  }

  // Fetch a single student by ID
  async getStudentById(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        payments: true,
        tokenUsageHistory: { orderBy: { createdAt: 'desc' } },
        tokenAddHistory: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  // Update student data (name, email, etc.)
  async updateStudentData(id: number, data: any) {
    let pinyinName;
    if (data.hanziName) {
      pinyinName = pinyin(data.hanziName, {
        style: pinyin.STYLE_NORMAL,
        heteronym: false,
      })
        .flat()
        .join(' ');
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        ...data,
        ...(pinyinName ? { pinyinName } : {}),
      },
    });
  }

  // Add or subtract tokens and log usage history
  // async addStudentTokens(id:number, tokenAmount:number){
  //   // 1. Update tokenRemaining
  //   const updatedStudent = await this.prisma.student.update({
  //     where: { id },
  //     data: {
  //       tokenRemaining: { increment: tokenAmount },
  //     },
  //     include: {
  //       tokenAddHistory: true,
  //     },
  //   });

  //   await this.prisma.tokenAddedDate.create({
  //       data: { studentId: id },
  //     });

  //     // Refresh tokenAddHistory to include the new row
  //     const refreshed = await this.prisma.student.findUnique({
  //       where: { id },
  //       include: { tokenAddHistory: { orderBy: { createdAt: 'desc' } } },
  //     });
  //     return refreshed;


  // }
  async subtractStudentTokens(id:number, tokenAmount:number){
    // 1. Update tokenRemaining
    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: {
        tokenRemaining: { increment: tokenAmount },
      },
      include: {
        tokenUsageHistory: true,
      },
    });

    await this.prisma.tokenUsedDate.create({
        data: { studentId: id, tokenAmount },
      });

      // Refresh tokenUsageHistory to include the new row
      const refreshed = await this.prisma.student.findUnique({
        where: { id },
        include: { tokenUsageHistory: { orderBy: { createdAt: 'desc' } } },
      });
      return refreshed;


  }


  // async updateStudentTokens(id: number, change: number) {
  //   // 1. Update tokenRemaining
  //   const updatedStudent = await this.prisma.student.update({
  //     where: { id },
  //     data: {
  //       tokenRemaining: { increment: change },
  //     },
  //     include: {
  //       tokenUsageHistory: true,
  //     },
  //   });

  //   // 2. Log usage if subtracting tokens
  //   if (change < 0) {
  //     await this.prisma.tokenUsedDate.create({
  //       data: { studentId: id },
  //     });

  //     // Refresh tokenUsageHistory to include the new row
  //     const refreshed = await this.prisma.student.findUnique({
  //       where: { id },
  //       include: { tokenUsageHistory: { orderBy: { createdAt: 'desc' } } },
  //     });
  //     return refreshed;
  //   }

  //   return updatedStudent;
  // }


  // students.service.ts
async addTokensWithPayment(studentId: number, tokenAmount: number, paymentUrl?: string) {
  // 1. Update tokens
  const updatedStudent = await this.prisma.student.update({
    where: { id: studentId },
    data: {
      tokenRemaining: { increment: tokenAmount },
    },
    include: { tokenAddHistory: true, payments: true },
  });

  // 2. Log token add history
  await this.prisma.tokenAddedDate.create({
    data: { studentId, tokenAmount },
  });

  // 3. Create payment proof if provided
  if (paymentUrl) {
    await this.prisma.paymentProof.create({
      data: { studentId, imageUrl: paymentUrl },
    });
  }

  // 4. Refresh student to get latest tokenAddHistory & payments
  return this.prisma.student.findUnique({
    where: { id: studentId },
    include: { tokenAddHistory: { orderBy: { createdAt: 'desc' } }, payments: true },
  });
}

}
