import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';

import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [StudentsModule, PrismaModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
