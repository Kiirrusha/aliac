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
