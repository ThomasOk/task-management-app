import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The task has been successfully created.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid task data provided.',
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all tasks',
    type: [Task],
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam({
    name: 'id',
    description: 'Task identifier',
    type: 'integer',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the task',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({
    name: 'id',
    description: 'Task identifier',
    type: 'integer',
  })
  @ApiBody({
    type: CreateTaskDto,
    description: 'Fields to update. All fields are optional.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The task has been successfully updated.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid update data provided.',
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({
    name: 'id',
    description: 'Task identifier',
    type: 'integer',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
