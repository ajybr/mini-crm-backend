import { 
  Injectable, 
  NotFoundException, 
  ForbiddenException,
  ConflictException 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDto, CreateTaskDto, UpdateTaskStatusDto } from './dto';
import { TaskStatus, Role } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDto> {
    const { assignedTo, customerId, title, description, status = TaskStatus.PENDING } = createTaskDto;

    // Verify assigned user exists and is an employee
    const assignedUser = await this.prisma.user.findUnique({
      where: { id: assignedTo },
    });

    if (!assignedUser) {
      throw new NotFoundException('Assigned user not found');
    }

    if (assignedUser.role !== Role.EMPLOYEE) {
      throw new ConflictException('Task can only be assigned to employees');
    }

    // Verify customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const task = await this.prisma.task.create({
      data: {
        title,
        description,
        status,
        assignedTo,
        customerId,
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return new TaskDto(task);
  }

  async findAll(userRole?: string, userId?: string): Promise<TaskDto[]> {
    const whereClause = userRole === Role.ADMIN ? {} : (userId ? { assignedTo: userId } : {});

    const tasks = await this.prisma.task.findMany({
      where: whereClause,
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map(task => new TaskDto(task));
  }

  async updateStatus(
    id: string, 
    updateTaskStatusDto: UpdateTaskStatusDto,
    userRole?: string,
    userId?: string
  ): Promise<TaskDto> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Check permissions
    if (userRole === Role.EMPLOYEE && userId && task.assignedTo !== userId) {
      throw new ForbiddenException('You can only update your own tasks');
    }

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: { status: updateTaskStatusDto.status },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return new TaskDto(updatedTask);
  }
}