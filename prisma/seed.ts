import { PrismaClient, Role, TaskStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { config } from "dotenv";

config({ path: ".env" });

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  await prisma.task.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const employeePassword = await bcrypt.hash("employee123", 10);
  const employee1 = await prisma.user.create({
    data: {
      name: "John Employee",
      email: "john@example.com",
      password: employeePassword,
      role: Role.EMPLOYEE,
    },
  });

  const employee2 = await prisma.user.create({
    data: {
      name: "Jane Employee",
      email: "jane@example.com",
      password: employeePassword,
      role: Role.EMPLOYEE,
    },
  });

  console.log("Users created");

  // Create customers
  const customer1 = await prisma.customer.create({
    data: {
      name: "Acme Corporation",
      email: "contact@acme.com",
      phone: "+1234567890",
      company: "Acme Corporation",
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: "Tech Solutions Inc",
      email: "info@techsolutions.com",
      phone: "+0987654321",
      company: "Tech Solutions Inc",
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      name: "Global Services Ltd",
      email: "hello@globalservices.com",
      phone: "+1122334455",
      company: "Global Services Ltd",
    },
  });

  console.log("Customers created");

  await prisma.task.createMany({
    data: [
      {
        title: "Initial consultation call",
        description: "Schedule and conduct initial consultation with Acme Corp",
        status: TaskStatus.PENDING,
        assignedTo: employee1.id,
        customerId: customer1.id,
      },
      {
        title: "Follow up on proposal",
        description: "Follow up with Tech Solutions regarding the proposal",
        status: TaskStatus.IN_PROGRESS,
        assignedTo: employee2.id,
        customerId: customer2.id,
      },
      {
        title: "Project kickoff meeting",
        description: "Organize kickoff meeting for Global Services project",
        status: TaskStatus.DONE,
        assignedTo: employee1.id,
        customerId: customer3.id,
      },
      {
        title: "Requirements gathering",
        description: "Gather detailed requirements from Acme Corp",
        status: TaskStatus.PENDING,
        assignedTo: employee2.id,
        customerId: customer1.id,
      },
      {
        title: "Technical assessment",
        description: "Perform technical assessment for Tech Solutions",
        status: TaskStatus.IN_PROGRESS,
        assignedTo: employee1.id,
        customerId: customer2.id,
      },
    ],
  });

  console.log("Tasks created");

  console.log("\nDatabase seeding completed successfully!");
  console.log("\nLogin credentials:");
  console.log("Admin: admin@example.com / admin123");
  console.log("Employee 1: john@example.com / employee123");
  console.log("Employee 2: jane@example.com / employee123");
  console.log("\nAPI Documentation: http://localhost:3000/api");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
