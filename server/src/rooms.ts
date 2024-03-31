import Elysia, { t } from "elysia";
import { makeAutoObservable } from "mobx";
import { Room, User } from "../../shared/types";
import { RoomModel } from "./Room";
import { createError, isError } from "./utils/error";

export class RoomsModel {
  private _rooms: RoomModel[] = [];

  socket;

  socketMessagesEvents = {
    join: (ws, data) => {
      try {
        const room = this.findRoomById(data.roomId);
        const user: User = {
          name: data.user_name,
          socketId: ws.id,
        };
        room.roomBroadcast.on("any", (data) => {
          ws.send(data);
        });
        room.join(user);
      } catch (error) {
        ws.send(error);
      }
    },
    move_to_spectator: (ws, data) => {
      try {
        const room = this.findRoomById(data.roomId);
        room.moveToSpectator(data.user_name);
      } catch (error) {
        ws.send(error);
      }
    },

    move_to_leader: (ws, data) => {
      try {
        const room = this.findRoomById(data.roomId);
        room.moveToLeader(data.teamName, data.user_name);
      } catch (error) {
        ws.send(error);
      }
    },

    move_to_player: (ws, data) => {
      try {
        const room = this.findRoomById(data.roomId);
        room.moveToPlayers(data.teamName, data.user_name);
      } catch (error) {
        ws.send(error);
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
        if (this.socketMessagesEvents[msg.eventType]) {
          this.socketMessagesEvents[msg.eventType](ws, msg.data);
        } else {
          const error = createError(
            "unknown event type",
            `Неизвестный тип события ${msg.eventType}`
          );
          ws.send(error);
        }
      },
      close: (ws) => {
        try {
          const room = this.findRoomByUserSocket(ws.id);
          room.spectators = room.spectators.filter((s) => s.socketId !== ws.id);
          room.teams = room.teams.filter((t) => t.players.some((p) => p.socketId === ws.id));
          room.teams = room.teams.filter((t) => t.leader?.socketId !== ws.id);
        } catch (e) {}
      },
    });
  }

  get rooms() {
    return this._rooms;
  }

  addRoom(user: User) {
    const room = new RoomModel(user);
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
    deletedRoom.deleteRoom();
    this._rooms = this._rooms.filter((r) => r.id !== id);
  }

  findRoomById(id: Room["id"]) {
    const foundedRoom = this._rooms.find((r) => r.id === id);
    if (!foundedRoom) {
      throw createError(
        "room not found in rooms",
        `Комнаты ${id} не существует`
      );
    }
    return foundedRoom;
  }

  findRoomByUserSocket(socketId: string) {
    const foundedRoom = this._rooms.find((r) =>
      r.spectators.some((s) => s.socketId === socketId)
    );
    if (!foundedRoom) {
      throw createError(
        "user not found",
        `Комнаты c юзером ${socketId} не существует`
      );
    }
    return foundedRoom;
  }

  findRoomByAdminName(adminName: User["name"]) {
    return this._rooms.find((r) => r.admin.name === adminName);
  }
}
