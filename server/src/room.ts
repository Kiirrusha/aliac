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
    this.teams = [
      {
        name: "Team 1",
        players: [
          {
            name: "Player 1",
          },
          {
            name: "Player 2",
          },
        ],
        leader: {
          name: "Leader1",
        },
        totalPoints: 0,
      },
      {
        name: "Team 2",
        players: [
          {
            name: "Player 3",
          },
          {
            name: "Player 4",
          },
        ],
        leader: {
          name: "Leader2",
        },
        totalPoints: 0,
      },
    ];
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

  get participants(): User[] {
    return [
      ...this.spectators,
      ...this.teams.map((t) => t.players).flat(),
      ...this.teams.map((t) => t.leader).filter((u) => !!u),
    ];
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

  moveToPlayers(teamName: string, userName) {
    const team = this.teams.find((t) => t.name === teamName);
    if (!team)
      throw createError("team not found", `Команда ${teamName} не найдена`);
    const user = this.participants.find((u) => u.name === userName);
    if (!user)
      throw createError(
        "user not found in room",
        `Пользователь ${userName} не найден в комнате ${this.id}`
      );
    if (team.players.find((u) => u.name === userName))
      throw createError(
        "user already in team",
        `Пользователь ${userName} уже в команде ${teamName}`
      );

    this.spectators = this.spectators.filter((u) => u.name !== userName);
    if (user === team.leader) team.leader = null;

    team.players.push(user);
  }

  moveToSpectator(userName: string) {
    const user = this.participants.find((u) => u.name === userName);
    if (!user)
      throw createError(
        "user not found in room",
        `Пользователь ${userName} не найден в комнате ${this.id}`
      );

    if (this.spectators.find((u) => u.name === userName))
      throw createError(
        "user already in spectators",
        `Пользователь ${userName} уже найден в списке наблюдателей`
      );
    this.teams.forEach((team) => {
      if (team.players.find((u) => u.name === userName)) {
        team.players = team.players.filter((u) => u.name !== userName);
      }
      if (team.leader?.name === userName) team.leader = null;
    });

    this.spectators.push(user);
  }

  moveToLeader(teamName: string, userName: string) {
    const team = this.teams.find((t) => t.name === teamName);
    if (!team)
      throw createError("team not found", `Команда ${teamName} не найдена`);
    const user = this.participants.find((u) => u.name === userName);
    if (!user)
      throw createError(
        "user not found in room",
        `Пользователь ${userName} не найден в комнате ${this.id}`
      );

    if (team.leader?.name === userName)
      throw createError(
        "user already leader",
        `Пользователь ${userName} уже в лидер ${teamName}`
      );

    this.spectators = this.spectators.filter((u) => u.name !== userName);
    team.players = team.players.filter((u) => u.name !== userName);

    team.leader = user;
  }

  deleteRoom() {
    this.roomBroadcast.emit("deleteRoom", undefined);
  }
}
