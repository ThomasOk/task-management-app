import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('tasks')
export class Task {
  @ApiProperty({ description: 'The unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Creation date' })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ApiProperty({ description: 'Task name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ description: 'Task description' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Task status', default: 'in-progress' })
  @Column({ type: 'text', default: 'in-progress' })
  status: string;

  @ApiProperty({ description: 'Due date' })
  @Column({ type: 'date', nullable: true })
  due_date: Date;

  @ApiProperty({ description: 'Project ID' })
  @Column({ type: 'integer', nullable: true })
  project_id: number;

  @ApiProperty({ description: 'List of collaborators emails' })
  @Column({ type: 'text', array: true, default: [] })
  collaborators: string[];

  @ManyToOne(() => Project, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
