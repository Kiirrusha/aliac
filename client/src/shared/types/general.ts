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
  teamNames: string[];
}
