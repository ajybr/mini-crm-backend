import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ description: 'Task title', example: 'Follow up with client' })
  @IsString()
  title!: string;

  @ApiProperty({ description: 'Task description', example: 'Call the client to discuss project requirements', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Assigned employee user ID', example: 'user123' })
  @IsString()
  assignedTo!: string;

  @ApiProperty({ description: 'Customer ID', example: 'customer123' })
  @IsString()
  customerId!: string;

  @ApiProperty({ description: 'Task status', enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class UpdateTaskStatusDto {
  @ApiProperty({ description: 'Task status', enum: TaskStatus, example: 'IN_PROGRESS' })
  @IsEnum(TaskStatus)
  status!: TaskStatus;
}