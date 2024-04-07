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
        name: "red",
        players: [],
        leader: null,
        totalPoints: 0,
      },
      {
        name: "blue",
        players: [],
        leader: null,
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
    if (this.participants.find((u) => u.name === user.name))
      throw createError(
        "user already in room",
        `Пользователь ${user.name} уже в комнате`
      );
    this.spectators.push(user);
    this.roomBroadcast.emit(
      "roomUpdate",
      new Response("roomUpdate", roomToDTO(this))
    );
  }

  moveToPlayers(teamName: string, userName) {
    const team = this.findTeamByName(teamName);
    const { user, where } = this.findUserByName(userName);
    if (team.players.find((u) => u.name === userName)) {
      throw createError(
        "user already in team",
        `Пользователь ${userName} уже в команде ${teamName}`
      );
    }

    this.removeUserByName(userName);
    team.players.push(user);
  }

  moveToSpectator(userName: string) {
    const { user, where } = this.findUserByName(userName);
    if (where === "spectators")
      throw createError(
        "user already in spectators",
        `Пользователь ${userName} уже найден в списке наблюдателей`
      );
    this.removeUserByName(userName);
    this.spectators.push(user);
  }

  moveToLeader(teamName: string, userName: string) {
    const team = this.findTeamByName(teamName);
    const { user, where } = this.findUserByName(userName);
    if (where === "leader")
      throw createError(
        "user already leader",
        `Пользователь ${userName} уже в лидер ${teamName}`
      );

    this.removeUserByName(userName);
    team.leader = user;
  }

  removeUserByName(userName: string) {
    this.spectators = this.spectators.filter((u) => u.name !== userName);
    this.teams.forEach((team) => {
      team.players = team.players.filter((u) => u.name !== userName);
      team.leader = team.leader?.name === userName ? null : team.leader;
    });
  }

  removeUserBySocketId(socketId: string) {
    this.spectators = this.spectators.filter((u) => u.socketId !== socketId);
    this.teams.forEach((team) => {
      team.players = team.players.filter((u) => u.socketId !== socketId);
      team.leader = team.leader?.socketId === socketId ? null : team.leader;
    });
  }

  findTeamByName(teamName: string) {
    const team = this.teams.find((t) => t.name === teamName);
    if (!team)
      throw createError("team not found", `Команда ${teamName} не найдена`);
    return team;
  }

  findUserByName(userName: string) {
    const user = this.participants.find((u) => u.name === userName);
    let where: "leader" | "players" | "spectators" | null = null;
    if (!user)
      throw createError(
        "user not found in room",
        `Пользователь ${userName} не найден в комнате ${this.id}`
      );
    if (this.spectators.find((u) => u.name === userName)) where = "spectators";
    if (this.teams.find((t) => t.players.find((u) => u.name === userName)))
      where = "players";
    if (this.teams.find((t) => t.leader?.name === userName)) where = "leader";

    return { user, where };
  }

  deleteRoom() {
    this.roomBroadcast.emit("deleteRoom", undefined);
  }

  createTeam(teamName: string) {
    if (teamName.length < 3 || teamName.length > 10)
      throw createError(
        "invalid team name",
        "Название команды должно содержать от 3 до 10 символов"
      );
    if (this.teams.length >= 4) {
      throw createError(
        "max teams reached",
        "Максимальное количество команд достигнуто"
      );
    }
    if (this.teams.find((t) => t.name === teamName))
      throw createError(
        "team already exists",
        `Команда ${teamName} уже существует`
      );

    const team: Team = {
      name: teamName,
      leader: null,
      players: [],
      totalPoints: 0,
    };
    this.teams.push();
  }

  deleteTeam(teamName: string) {
    this.findTeamByName(teamName);
    this.teams = this.teams.filter((t) => t.name !== teamName);
  }

  checkAdmin(userName: string) {
    if (this.admin.name !== userName)
      throw createError(
        "not admin",
        `Вы не являетесь администратором комнаты ${this.id}`
      );
  }
}
