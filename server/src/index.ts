import cors from "@elysiajs/cors";
import { Elysia } from "elysia";

let count = 1;

setInterval(() => {
  count++;
}, 1000);

const app = new Elysia()
  .use(cors())
  .ws("/ws", {
    message(ws, message) {
      console.log(message);
      if (message === "hello") {
        setInterval(() => {
          ws.send(count);
        }, 1000);
      }
    },
  })
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
