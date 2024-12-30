import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './entities/project.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been successfully created.',
    type: Project,
  })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({
    status: 200,
    description: 'Return all projects',
    type: [Project],
  })
  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({
    status: 200,
    description: 'Return the project',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully updated.',
    type: Project,
  })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: Partial<CreateProjectDto>,
  ): Promise<Project> {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({
    status: 200,
    description: 'The project has been successfully deleted.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(+id);
  }
}
