import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesResolver } from './classes.resolver';
import { ClassesController } from './classes.controller';

@Module({
  providers: [ClassesService, ClassesResolver],
  controllers: [ClassesController],
  exports: [ClassesService],
})
export class ClassesModule {}