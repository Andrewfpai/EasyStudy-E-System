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
}
