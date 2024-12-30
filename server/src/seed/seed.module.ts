import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Project } from '../projects/entities/project.entity';
import { typeOrmConfig } from '../config/typeorm.config';
import { Task } from '../tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Project, Task]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
