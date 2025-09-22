import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAll() {
    return this.studentsService.getAllStudents();
  }

  @Post()
  create(@Body() body) {
    return this.studentsService.createStudent(body);
  }
}
