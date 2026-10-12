import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1985-03-12", salary: 85000 },
    { name: "Bob Smith", birthday: "1990-07-24", salary: 72000 },
    { name: "Carla Gomez", birthday: "1988-11-05", salary: 95000 },
    { name: "David Lee", birthday: "1992-01-30", salary: 68000 },
    { name: "Emily Chen", birthday: "1995-09-17", salary: 78000 },
    { name: "Farhan Ali", birthday: "1983-06-02", salary: 110000 },
    { name: "Grace Kim", birthday: "1991-12-21", salary: 64000 },
    { name: "Hector Ruiz", birthday: "1987-04-09", salary: 90000 },
    { name: "Isabel Novak", birthday: "1994-08-14", salary: 70000 },
    { name: "Jamal Brown", birthday: "1989-02-27", salary: 82000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}