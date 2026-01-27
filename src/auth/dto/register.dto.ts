import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ description: 'User full name', example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'User email address', example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'User password (min 8 characters)', example: 'password123' })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ description: 'User role', enum: Role, example: 'EMPLOYEE' })
  @IsEnum(Role)
  role!: Role;
}