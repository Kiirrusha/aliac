export interface User {
  name: string;
  socketId?: string;
}

export interface Team {
  name: string;
  players: User[];
  leader: User;
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
  rounds: number | null;
}

