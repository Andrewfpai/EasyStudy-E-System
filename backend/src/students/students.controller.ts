import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
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



}
