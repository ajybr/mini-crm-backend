import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserRoleDto {
  @ApiProperty({ 
    description: 'User role', 
    enum: Role, 
    example: 'ADMIN',
    required: true 
  })
  @IsEnum(Role)
  role!: Role;
}