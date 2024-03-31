import Elysia from "elysia";
import { Room, Team, User } from "../../shared/types";
import { EventEmitter } from "./EventEmitter";

export class RoomModel implements Room {
  name: string;
  id: string;
  admin: User;
  teams: Team[];
  spectators: User[];
  pointsToWin: number | null;
  roundTime: number;
  rounds: number | null;

  roomBroadcast = new EventEmitter()

  constructor(admin: User) {
    this.name = "";
    this.id = crypto.randomUUID();
    this.admin = admin;
    this.teams = [];
    this.spectators = [];
    this.pointsToWin = null;
    this.roundTime = 0;
    this.rounds = null;
  }

  get participants() {
    return [...this.spectators, ...this.teams.map((t) => t.players).flat()];
  }

  join(user: User) {
    this.spectators.push(user);
  }

  deleteRoom() {}
}
