import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

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

  @Patch(':id/tokens')
  async updateStudentTokens(@Param('id') id: string, @Body('change') change: number) {
    return this.studentsService.updateStudentTokens(+id, change);
  }


}
