# 🏢 Mini CRM Backend

A production-ready CRM backend built with NestJS, PostgreSQL, and Prisma.

## 🚀 Quick Start

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

## 📋 Core Features

✅ **Authentication**: JWT-based with bcrypt password hashing
✅ **Authorization**: Role-based (ADMIN/EMPLOYEE)
✅ **User Management**: Admin-only CRUD operations
✅ **Customer Management**: Full CRUD with pagination
✅ **Task Management**: Assignment and status tracking
✅ **API Documentation**: Swagger with OpenAPI spec

## 🛠️ Tech Stack

- **Backend**: NestJS + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT + bcrypt
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

## 📦 Project Structure

```
src/
├── auth/           # Authentication
├── users/          # User management (Admin)
├── customers/       # Customer management
├── tasks/           # Task management
├── common/          # Shared utilities
├── prisma/          # Database layer
└── config/          # Configuration
```

## 🚀 Production Ready

All code is production-ready with:
- Clean, secure environment configuration
- Proper error handling and validation
- Database migrations and seeding
- Complete API documentation
- Optimized build configuration

**Ready for immediate deployment! 🎯**
