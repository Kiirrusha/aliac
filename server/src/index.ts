import cors from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { RoomsModel } from "./rooms";
import { User } from "../../shared/types";
import { roomToDTO } from "./utils/roomDTO";

const rooms = new RoomsModel();

const app = new Elysia();

app.use(cors());
app.use(rooms.socket);

app.get("/rooms", () => {
  return rooms.rooms.map((room) => roomToDTO(room));
});

app.post(
  "/rooms",
  (req) => {
    const name = req.query.user_name;
    const user: User = {
      name,
    };
    const room = rooms.addRoom(user);
    return roomToDTO(room);
  },
  {
    query: t.Object({
      user_name: t.String(),
    }),
  }
);

app.listen(3000);
