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