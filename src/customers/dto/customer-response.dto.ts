import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({ description: 'Customer ID' })
  id!: string;

  @ApiProperty({ description: 'Customer name' })
  name!: string;

  @ApiProperty({ description: 'Customer email' })
  email!: string;

  @ApiProperty({ description: 'Customer phone' })
  phone!: string;

  @ApiProperty({ description: 'Customer company', required: false })
  company?: string;

  @ApiProperty({ description: 'Account creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;

  constructor(customer: any) {
    this.id = customer.id;
    this.name = customer.name;
    this.email = customer.email;
    this.phone = customer.phone;
    this.company = customer.company || undefined;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
  }
}

export class PaginatedCustomersDto {
  @ApiProperty({ description: 'Current page number' })
  page!: number;

  @ApiProperty({ description: 'Number of items per page' })
  limit!: number;

  @ApiProperty({ description: 'Total number of customers' })
  totalRecords!: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages!: number;

  @ApiProperty({ description: 'List of customers', type: [CustomerDto] })
  data!: CustomerDto[];
}