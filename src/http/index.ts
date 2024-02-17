import {Elysia} from "elysia";

const app = new Elysia()
  .get("/", () => {
    return "Hello World"
  })

app.listen(5555, () => console.log("🔥 Server is running..."))