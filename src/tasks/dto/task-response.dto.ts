import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ description: 'Task ID' })
  id: string;

  @ApiProperty({ description: 'Task title' })
  title: string;

  @ApiProperty({ description: 'Task description' })
  description?: string;

  @ApiProperty({ description: 'Task status' })
  status: string;

  @ApiProperty({ description: 'Assigned user ID' })
  assignedTo: string;

  @ApiProperty({ description: 'Customer ID' })
  customerId: string;

  @ApiProperty({ description: 'Task creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Task last update date' })
  updatedAt: Date;

  @ApiProperty({ description: 'Assigned user details' })
  assignee?: {
    id: string;
    name: string;
    email: string;
  };

  @ApiProperty({ description: 'Customer details' })
  customer?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };

  constructor(task: any) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description || undefined;
    this.status = task.status;
    this.assignedTo = task.assignedTo;
    this.customerId = task.customerId;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    
    if (task.assignee) {
      this.assignee = {
        id: task.assignee.id,
        name: task.assignee.name,
        email: task.assignee.email,
      };
    }
    
    if (task.customer) {
      this.customer = {
        id: task.customer.id,
        name: task.customer.name,
        email: task.customer.email,
        phone: task.customer.phone,
      };
    }
  }
}