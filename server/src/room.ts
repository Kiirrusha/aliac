import Elysia from "elysia";
import { Room, Team, User } from "../../shared/types";
import { EventEmitter } from "./utils/EventEmitter";
import { createError } from "./utils/error";
import { Response } from "./utils/response";
import { roomToDTO } from "./utils/roomDTO";
import { autorun, makeAutoObservable, reaction, runInAction } from "mobx";

export class RoomModel implements Room {
  name: string;
  id: string;
  admin: User;
  teams: Team[];
  spectators: User[];
  pointsToWin: number | null;
  roundTime: number;
  rounds: number | null;

  roomBroadcast = new EventEmitter();

  constructor(admin: User) {
    makeAutoObservable(this);

    this.name = "";
    this.id = crypto.randomUUID();
    this.admin = admin;
    this.teams = [];
    this.spectators = [];
    this.pointsToWin = null;
    this.roundTime = 0;
    this.rounds = null;

    autorun(() => {
      this.roomBroadcast.emit(
        "roomUpdate",
        new Response("roomUpdate", roomToDTO(this))
      );
    });
  }

  get participants() {
    return [...this.spectators, ...this.teams.map((t) => t.players).flat()];
  }

  join(user: User) {
    if (this.participants.some((p) => p.name === user.name)) {
      throw createError(
        "user already joined",
        `Пользователь ${user.name} уже в комнате`
      );
    }
    this.spectators.push(user);
    this.roomBroadcast.emit(
      "roomUpdate",
      new Response("roomUpdate", roomToDTO(this))
    );
  }

  deleteRoom() {
    this.roomBroadcast.emit("deleteRoom", undefined);
  }
}
