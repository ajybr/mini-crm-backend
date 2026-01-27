import { 
  Injectable, 
  NotFoundException, 
  ConflictException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CustomerDto, 
  PaginatedCustomersDto,
  CreateCustomerDto,
  UpdateCustomerDto 
} from './dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    try {
      const customer = await this.prisma.customer.create({
        data: createCustomerDto,
      });
      return new CustomerDto(customer);
    } catch (error: any) {
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        if (target?.includes('email')) {
          throw new ConflictException('Email already exists');
        }
        if (target?.includes('phone')) {
          throw new ConflictException('Phone number already exists');
        }
        throw new ConflictException('Duplicate entry');
      }
      throw error;
    }
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedCustomersDto> {
    const skip = (page - 1) * limit;

    const [customers, totalRecords] = await Promise.all([
      this.prisma.customer.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.customer.count(),
    ]);

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      page,
      limit,
      totalRecords,
      totalPages,
      data: customers.map(customer => new CustomerDto(customer)),
    };
  }

  async findOne(id: string): Promise<CustomerDto> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return new CustomerDto(customer);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<CustomerDto> {
    try {
      const customer = await this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
      });
      return new CustomerDto(customer);
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Customer not found');
      }
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        if (target?.includes('email')) {
          throw new ConflictException('Email already exists');
        }
        if (target?.includes('phone')) {
          throw new ConflictException('Phone number already exists');
        }
        throw new ConflictException('Duplicate entry');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.customer.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Customer not found');
      }
      throw error;
    }
  }
}