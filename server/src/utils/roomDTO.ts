import { Room } from "../../../shared/types";
import { RoomModel } from "../Room";

export const roomToDTO = (room: RoomModel): Room => {
  return {
    name: room.name,
    id: room.id,
    admin: room.admin,
    teams: room.teams,
    pointsToWin: room.pointsToWin,
    roundTime: room.roundTime,
    rounds: room.rounds,
    spectators: room.spectators,
  };
};
