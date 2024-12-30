import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @ApiProperty({ description: 'The unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Creation date' })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({ description: 'Project name' })
  @Column({ type: 'text' })
  name: string;

  @ApiProperty({ description: 'Project slug' })
  @Column({ type: 'text' })
  slug: string;

  @ApiProperty({ description: 'Project status' })
  @Column({ type: 'text', default: 'in-progress' })
  status: string;

  @ApiProperty({ type: [String], description: 'List of collaborators emails' })
  @Column({ type: 'text', array: true, default: [] })
  collaborators: string[];
}
