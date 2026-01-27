import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Customer name', example: 'John Smith' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Customer email', example: 'john@company.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Customer phone', example: '+1234567890' })
  @IsString()
  phone!: string;

  @ApiProperty({ description: 'Customer company', example: 'Acme Corp', required: false })
  @IsOptional()
  @IsString()
  company?: string;
}

export class UpdateCustomerDto {
  @ApiProperty({ description: 'Customer name', example: 'John Smith', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Customer email', example: 'john@company.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Customer phone', example: '+1234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Customer company', example: 'Acme Corp', required: false })
  @IsOptional()
  @IsString()
  company?: string;
}