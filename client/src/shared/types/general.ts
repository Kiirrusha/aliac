import { GAME_STATE_NUMBER } from "src/stores/GameStore";

export interface WordKit {
  name: string;
  image: string;
  selected: boolean;
}

export type WordKits = WordKit[];

export interface RoomSettings {
  roundTime: string;
  pointsToWin: string;
  reducePoints: boolean;
  teams: TeamsSettings[];
}
interface TeamsSettings {
  name: string;
  id: string | undefined;
}

export interface User {
  name: string;
  socketId?: string;
}

export interface Team {
  id?: string;
  name: string;
  players: User[];
  leader: User | null;
  totalPoints: number;
}

export interface Room {
  gameState: GAME_STATE_NUMBER;

  name: string;
  id: string;
  admin: User;
  spectators: User[];
  teams: Team[];

  pointsToWin: number | null;
  roundTime: number;
  reducePoints: boolean;
  wordKits: WordKits;
}

export const GAME_STATE = {
  0: "preparing",
  1: "starting",
  2: "waiting",
  3: "running",
  4: "ending",
  5: "gameover",
} as const;

export type GAME_STATE_NUMBER = keyof typeof GAME_STATE;
export type GAME_STATE_VALUE = (typeof GAME_STATE)[keyof typeof GAME_STATE];
