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

  @Patch(':id/tokens')
  async updateTokens(@Param('id') id: string, @Body('change') change: number) {
    return this.studentsService.updateTokens(+id, change);
  }

}
