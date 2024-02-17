/* eslint-disable drizzle/enforce-delete-with-where */
import {faker} from "@faker-js/faker";
import chalk from "chalk";
import {db} from "./connection";
import {restaurants, users} from "./schema";

/**
 * Reset database
 */

await db.delete(users);
await db.delete(restaurants);

console.log(chalk.yellow("✅ Database reset!"));

/**
 * Create costumers
 */

await db.insert(users).values([
    {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "costumer",
    },
    {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: "costumer",
    },
]);

console.log(chalk.yellow("✅ Create costumers"));

/**
 * Create manager
 */

const [manager] = await db
    .insert(users)
    .values([
        {
            name: faker.person.fullName(),
            email: "admin@admin.com",
            role: "manager",
        },
    ])
    .returning({ id: users.id });

console.log(chalk.yellow("✅ Create manager"));

/**
 * Create restaurant
 */

await db.insert(restaurants).values([
    {
        name: faker.company.name(),
        description: faker.lorem.paragraph(1),
        managerId: manager.id,
    },
]);

console.log(chalk.yellow("✅ Create restaurant"));

console.log(chalk.greenBright("🛑 Database seed successfully"));

process.exit();
