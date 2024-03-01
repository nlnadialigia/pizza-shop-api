import chalk from "chalk";
import {eq} from "drizzle-orm";
import {Elysia, t} from "elysia";
import {db} from "../db/connection";
import {restaurants, users} from "../db/schema";

const app = new Elysia()
    .post("/restaurants", async ({body, set}) => {
        const {restaurantName, managerName, email, phone} = body;
        let managerId = "";

        const [managerExist] = await db.query.users.findMany({
            where: eq(users.email, email)
        });

        console.log(chalk.cyan("manager exist result => ", managerExist));

        if (!managerExist.id) {
            const [manager] = await db.insert(users).values({
                name: managerName, 
                email, 
                phone,
                role: "manager"
            }).returning({id: users.id});

            managerId = manager.id;
        } else {
            managerId = managerExist.id;
        }
        
        await db.insert(restaurants).values({
            name: restaurantName,
            managerId: managerId
        });

        set.status = 204;
    }, {
        body: t.Object({
            restaurantName: t.String(),
            managerName: t.String(),
            phone: t.String(),
            email: t.String({ format: "email" }),
        })
    }
    );

app.listen(5555, () => console.log("🔥 Server is running..."));