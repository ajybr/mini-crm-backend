import { 
  Controller, 
  Get, 
  Post, 
  Patch, 
  Delete, 
  Param, 
  Body, 
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiSecurity } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { 
  CustomerDto, 
  PaginatedCustomersDto,
  CreateCustomerDto,
  UpdateCustomerDto 
} from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';


@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created successfully', type: CustomerDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Email or phone already exists' })
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Get all customers with pagination (Admin + Employee)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({ status: 200, description: 'Paginated list of customers', type: PaginatedCustomersDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<PaginatedCustomersDto> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    
    if (pageNum < 1 || limitNum < 1) {
      throw new Error('Page and limit must be positive numbers');
    }
    
    return this.customersService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Get customer by ID (Admin + Employee)' })
  @ApiResponse({ status: 200, description: 'Customer details', type: CustomerDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async findOne(@Param('id') id: string): Promise<CustomerDto> {
    return this.customersService.findOne(id);
  }

@Patch(':id')
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Update customer details' })
  @ApiResponse({ status: 200, description: 'Customer updated successfully', type: CustomerDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<CustomerDto> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiSecurity('bearer')
  @ApiOperation({ summary: 'Delete customer' })
  @ApiResponse({ status: 204, description: 'Customer deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.customersService.remove(id);
  }
}