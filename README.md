# Mini CRM Backend

A production-ready CRM backend built with NestJS, PostgreSQL, and Prisma.

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run start:dev

# Production build
npm run build
npm run start:prod
```

**Server will be running at:** `http://localhost:3000`
**API Documentation:** `http://localhost:3000/api`

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `build` | `nest build` | Build the application for production |
| `start` | `node dist/src/main` | Start the production server |
| `test` | `jest` | Run unit tests |
| `test:cov` | `jest --coverage` | Run tests with coverage report |
| `db:seed` | `tsx prisma/seed.ts` | Seed database with sample data |
| `db:migrate` | `npx prisma migrate dev` | Run database migrations |
| `db:generate` | `npx prisma generate` | Generate Prisma client |


## Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable | Description | Default | Required | Example |
|-----------|-------------|---------|----------|----------|
| `DATABASE_URL` | PostgreSQL connection string | - | ✅ | `postgresql://username:password@localhost:5432/mini_crm` |
| `JWT_SECRET` | Secret key for JWT token signing | - | ✅ | `your-super-secure-jwt-secret-key-min-32-chars` |
| `JWT_EXPIRATION_TIME` | JWT token expiration time | `24h` | ❌ | `24h`, `7d`, `1h` |
| `PORT` | Server port number | `3000` | ❌ | `3000`, `8080`, `5000` |

checkout .env.example

### Database Setup

#### Local Development
1. **Install PostgreSQL** on your system
2. **Create database:** `createdb mini_crm`
3. **Update DATABASE_URL:** Use your PostgreSQL credentials
4. **Run migrations:** `npx prisma migrate dev`

#### Production Environment
1. **Use secure JWT_SECRET:** Minimum 32 characters
2. **Configure connection pooling** for production database
3. **Set proper database permissions** for the application user

##  Database Schema

### Entity Relationship Overview
```
User (ADMIN/EMPLOYEE)
  ↳ 1←→N Tasks (as assignee)
  
Customer
  ↳ 1←→N Tasks (many-to-one)
```

### Models Documentation

#### User Model
**Purpose:** Stores user authentication and role data
```prisma
model User {
  id        String   @id @default(cuid())
  name      String   
  email     String   @unique
  password  String   
  role      Role     @default(EMPLOYEE)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relationships
  assignedTasks Task[] @relation("TaskAssignee")
}
```
- **Fields:** id, name, email, password, role, timestamps
- **Roles:** `ADMIN`, `EMPLOYEE`
- **Unique Constraints:** email
- **Relationships:** One-to-many with Tasks (as assignee)

#### Customer Model
**Purpose:** Stores customer information for CRM operations
```prisma
model Customer {
  id        String   @id @default(cuid())
  name      String   
  email     String   @unique
  phone     String   @unique
  company   String?  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relationships
  tasks     Task[]
}
```
- **Fields:** id, name, email, phone, company, timestamps
- **Unique Constraints:** email, phone
- **Relationships:** One-to-many with Tasks

#### Task Model
**Purpose:** Tracks work tasks assigned to employees for customers
```prisma
model Task {
  id          String     @id @default(cuid())
  title       String    
  description String?   
  status      TaskStatus @default(PENDING)
  assignedTo  String    
  customerId  String    
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  // Relationships
  assignee    User       @relation("TaskAssignee", fields: [assignedTo], references: [id])
  customer    Customer   @relation(fields: [customerId], references: [id])
}
```
- **Fields:** id, title, description, status, assignments, timestamps
- **Status Values:** `PENDING`, `IN_PROGRESS`, `DONE`
- **Relationships:** Many-to-one with User and Customer

#### Enums
```prisma
enum Role {
  ADMIN
  EMPLOYEE
}

enum TaskStatus {
  PENDING
  IN_PROGRESS
  DONE
}
```

### Database Relationships Summary
- **Users** can be assigned multiple Tasks
- **Customers** can have multiple Tasks
- **Tasks** belong to exactly one User (assignee) and one Customer
- **Role-based Access:** ADMIN can access all endpoints, EMPLOYEE has limited access

## 📚 API Documentation (Swagger)

### Accessing Documentation

- **Development:** http://localhost:3000/api
- **Production:** https://your-domain.com/api

### Authentication in Swagger

1. **Generate JWT Token:** Use `POST /auth/login` endpoint
2. **Open Swagger UI:** Navigate to `/api` endpoint
3. **Click "Authorize" Button:** Located in the top-right corner
4. **Enter Bearer Token:** Format: `Bearer <your-jwt-token>`
5. **Test Protected Endpoints:** All protected routes will be authenticated

## Core Features

- **Authentication**: JWT-based with bcrypt password hashing
- **Authorization**: Role-based (ADMIN/EMPLOYEE)
- **User Management**: Admin-only CRUD operations
- **Customer Management**: Full CRUD with pagination
- **Task Management**: Assignment and status tracking
- **API Documentation**: Swagger with OpenAPI spec

## Tech Stack

- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcrypt
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:cov
```

## 🚀 Deployment

### Production Build
```bash
# Build optimized version
npm run build

# Start production server
npm start
```

**Ready for immediate deployment!**
