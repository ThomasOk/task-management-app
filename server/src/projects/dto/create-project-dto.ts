import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Project name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Project slug' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ default: 'in-progress' })
  @IsOptional()
  @IsString()
  status?: string = 'in-progress';

  @ApiProperty({ type: [String], default: [] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  collaborators?: string[] = [];
}
