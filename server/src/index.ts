import cors from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { RoomsModel } from "./rooms";
import { User } from "../../shared/types";

const rooms = new RoomsModel();

const app = new Elysia();

app.use(cors());
app.use(rooms.socket);

app.get("/rooms", () => {
  return rooms.rooms;
});

app.post(
  "/rooms",
  (req) => {
    const name = req.query.user_name;
    const user: User = {
      name,
    };
    const room = rooms.addRoom(user);
    return room;
  },
  {
    query: t.Object({
      user_name: t.String(),
    }),
  }
);

app.delete(
  "/rooms/:id",
  (req) => {
    const id = req.params.id;
    const adminName = req.query.user_name;

    const deletedRoom = rooms.removeRoom(id, adminName);
    return deletedRoom;
  },
  {
    query: t.Object({ user_name: t.String() }),
    params: t.Object({ id: t.String() }),
  }
);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
