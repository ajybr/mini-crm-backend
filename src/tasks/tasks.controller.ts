import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Param, 
  Body, 
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { TaskDto, CreateTaskDto, UpdateTaskStatusDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';


@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

@Post()
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully', type: TaskDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User or customer not found' })
  @ApiResponse({ status: 409, description: 'Task can only be assigned to employees' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Get tasks (Admin: all, Employee: own tasks)' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [TaskDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }

  @Patch(':id/status')
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Update task status' })
  @ApiResponse({ status: 200, description: 'Task status updated', type: TaskDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Can only update own tasks' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<TaskDto> {
    return this.tasksService.updateStatus(id, updateTaskStatusDto);
  }
}