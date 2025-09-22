// src/students/students.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  // Fetch all students
  getAllStudents() {
    return this.prisma.student.findMany();
  }

  // Create a new student
  createStudent(data: any) {
    return this.prisma.student.create({
      data,
    });
  }

  async getStudentById(id: number) {
  return this.prisma.student.findUnique({
    where: { id },
  });
}


  async updateTokens(id: number, change: number) {
  return this.prisma.student.update({
    where: { id },
    data: {
      tokenRemaining: { increment: change }, // change can be +1 or -1
      tokenUsed: { increment: 0 }           // or just remove if no change
    }
  });
}


}
