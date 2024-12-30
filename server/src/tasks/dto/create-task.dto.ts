import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty({ description: 'Task name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Task description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: 'in-progress' })
  @IsOptional()
  @IsString()
  status?: string = 'in-progress';

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  due_date?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  project_id?: number;

  @ApiProperty({ type: [String], default: [] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  collaborators?: string[] = [];
}
