// src/students/students.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import pinyin from 'pinyin';

@Injectable()
export class StudentsService {
  constructor(@Inject('PRISMA') private prisma: PrismaClient) {}

  // Fetch all students
  getAllStudents() {
    return this.prisma.student.findMany();
  }

  // Create a new student
  createStudent(data: any) {
    const pinyinName = pinyin(data.hanziName, {
      style:pinyin.STYLE_NORMAL,
      heteronym: false,
    })
      .flat()
      .join(' ')
    return this.prisma.student.create({
      data: {
        ...data,
        pinyinName,
      },
    });
  }

  async getStudentById(id: number) {
  return this.prisma.student.findUnique({
    where: { id },
  });
}


  async updateStudentData(id: number, data: any) {
    let pinyinName;
    if (data.hanziName) {
      pinyinName = pinyin(data.hanziName, {
        style: pinyin.STYLE_NORMAL,
        heteronym: false,
      }).flat().join(' ');
    }

    return this.prisma.student.update({
      where: { id },
      data: {
        ...data,
        ...(pinyinName ? { pinyinName } : {}),
      },
    });
  }

  async updateStudentTokens(id: number, change: number) {
    // let pinyinName: string | undefined;

    // if (data.hanziName) {
    //     pinyinName = pinyin(data.hanziName, {
    //       style: pinyin.STYLE_NORMAL,
    //       heteronym: false,
    //     })
    //       .flat()
    //       .join(' ');
    //   }
    //  return this.prisma.student.update({
    //     where: { id },
    //     data: {
    //       ...data,
    //       ...(pinyinName ? { pinyinName } : {}), // only update if hanzi changed
    //     },
    //   });
    return this.prisma.student.update({
      where: { id },
      data: {
        tokenRemaining: { increment: change }, // change can be +1 or -1
        tokenUsed: { increment: 0 }           // or just remove if no change
      }
    });
  }



}
