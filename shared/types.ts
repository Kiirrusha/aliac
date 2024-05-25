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
}
