import { Controller, Get, Post, Patch, Param, Body, Delete,
  BadRequestException, UploadedFile, UseInterceptors
 } from '@nestjs/common';
 import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';
import { FileInterceptor } from '@nestjs/platform-express';
import {StudentsService} from './students.service';
import { existsSync, mkdirSync } from 'fs';

const PROFILE_PICTURE_SUBFOLDER = 'profile-pictures';


@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAll() {
    return this.studentsService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(+id); // convert string → number
  }


  @Post()
  create(@Body() body) {
    return this.studentsService.createStudent(body);
  }

  @Patch(':id')
  async updateStudentData(@Param('id') id: string, @Body() data: any) {
    return this.studentsService.updateStudentData(+id, data);
  }

  // @Patch(':id/tokens')
  // async updateStudentTokens(@Param('id') id: string, @Body('change') change: number) {
  //   return this.studentsService.updateStudentTokens(+id, change);
  // }
  // @Patch(':id/add-tokens')
  // async addStudentTokens(@Param('id') id: string, @Body('tokenAmount') tokenAmount: number) {
  //   return this.studentsService.addStudentTokens(+id, tokenAmount);
  // }
  @Patch(':id/subtract-tokens')
  async subtractStudentTokens(@Param('id') id: string, @Body('tokenAmount') tokenAmount: number) {
    return this.studentsService.subtractStudentTokens(+id, tokenAmount);
  }

  @Patch(':id/add-tokens-with-payment')
  async addTokensWithPayment(
    @Param('id') id: string,
    @Body() body: { tokenAmount: number; paymentUrl?: string }
  ) {
    return this.studentsService.addTokensWithPayment(+id, body.tokenAmount, body.paymentUrl);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return this.studentsService.deleteStudent(+id);
  }


  @Post(':id/profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, callback) => {
          const dir = join(process.env.UPLOAD_DIR || './uploads', PROFILE_PICTURE_SUBFOLDER);
          if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
          }
          callback(null, dir);
        },
        filename: (_req, file, callback) => {
          callback(null, `${randomUUID()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(new BadRequestException('File must be an image'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    const publicUrl = `${process.env.BACKEND_PUBLIC_URL || 'http://localhost:5000'}/uploads/${PROFILE_PICTURE_SUBFOLDER}/${file.filename}`;

    return this.studentsService.updateProfilePicture(Number(id), publicUrl);
  }



}
