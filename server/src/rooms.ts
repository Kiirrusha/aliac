import Elysia, { t } from "elysia";
import { Room, User } from "../../shared/types";
import { EventEmitter } from "./EventEmitter";
import { autorun, makeAutoObservable } from "mobx";
import { RoomModel } from "./Room";

export class RoomsModel {
  private _rooms: Room[] = [];

  socket;

  socketMessagesEvents = {
    join: (ws, data) => {
      const user: User = {
        name: data.user_name,
        socketId: ws.id,
      };
      const res = this.addSpectator(data.roomId, user);

      if (isError(res)) {
        ws.send(res);
      } else {
        autorun(() => {
          ws.send({
            eventType: "user_room",
            data: res.room,
          });
        });
      }
    },
  };

  constructor() {
    makeAutoObservable(this);
    this.socket = new Elysia().ws("/room", {
      body: t.Object({
        eventType: t.String(),
        data: t.Any(),
      }),

      message: (ws, msg) => {
        if (!this.socketMessagesEvents[msg.eventType]) {
          const error = createError(
            "unknown event type",
            `Неизвестный тип события ${msg.eventType}`
          );
          ws.send(error);
        } else {
          this.socketMessagesEvents[msg.eventType](ws, msg.data);
        }
      },
      close: (ws) => {
        this.onUserCloseSocket(ws.id);
      },
    });
  }

  get rooms() {
    return this._rooms;
  }

  addRoom(admin: User) {
    if (this.findRoomByAdminName(admin.name)) {
      return createError(
        "room already exists",
        `Комната ${admin.name} уже существует`
      );
    }
    const room = new RoomModel(admin);

    this._rooms.push(room);
    return room;
  }

  removeRoom(id: Room["id"], adminName: User["name"]) {
    const deletedRoom = this.findRoomById(id);
    if (isError(deletedRoom)) {
      const error = deletedRoom;
      return error;
    }
    if (deletedRoom.admin.name !== adminName) {
      return createError(
        "not admin",
        "Вы не являетесь администратором этой комнаты"
      );
    }
    this._rooms = this._rooms.filter((r) => r.id !== id);
    return deletedRoom;
  }

  findRoomById(id: Room["id"]) {
    const foundedRoom = this._rooms.find((r) => r.id === id);
    if (!foundedRoom) {
      return createError("room not found", `Комнаты ${id} не существует`);
    }
    return foundedRoom;
  }

  onUserCloseSocket(socketId: string) {
    this._rooms.forEach((r) => {
      r.spectators = r.spectators.filter((s) => s.socketId !== socketId);
    });
  }

  findRoomByAdminName(adminName: User["name"]) {
    return this._rooms.find((r) => r.admin.name === adminName);
  }

  addSpectator(roomId: Room["id"], user: User) {
    const room = this.findRoomById(roomId);

    if (isError(room)) {
      const error = room;
      return error;
    }
    room.spectators.push(user);

    return { room, user };
  }
}
