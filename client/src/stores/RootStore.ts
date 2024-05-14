import { makeAutoObservable } from "mobx";
import { Room } from "../../../shared/types";
import axios from "axios";
import { UserStore } from "./userStore";
import { toast } from "react-toastify";
import { connection } from "../App";

export class RootStore {
  userStore: UserStore;

  rooms!: Room[];

  room: Room | null = null;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);

    this.getRooms();
  }

  getRooms = async () => {
    this.rooms = (await axios.get("http://localhost:3000/rooms")).data;
  };

  addRoom = async () => {
    const user_name = localStorage.getItem("user_name");
    if (!user_name) return;
    await axios.post<Room>(
      `http://localhost:3000/rooms?user_name=${user_name}`
    );

    this.getRooms();
  };

  joinRoom = async (roomId: string) => {
    if (!roomId || !localStorage.getItem("user_name")) return;

    try {
      const body = {
        data: {
          roomId,
          user_name: localStorage.getItem("user_name"),
        }
      };

      const result = await connection.invoke("JoinRoom", body);

      if (result.value.status === "success"){
        toast.success("Успешный вход в комнату");
        this.room = result.value.data;
      }

      if (result.value.status === "error") {
        toast.error(result.value.error);
        return;
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  leaveRoom = async (roomId: string) => {
    const body = {
      data: {
        roomId,
        user_name: localStorage.getItem("user_name"),
      }
    };

    const result = await connection.invoke("LeaveRoom", body);

    if (result.value.status === "success"){
      toast.success("Вы вышли из комнаты");
      this.room = null;
    }
    
    if (result.value.status === "error") {
      toast.error(result.value.error);
      return;
    } 
  };

  moveToPlayer = async (teamName: string) => {
    if (!this.room) return;

    const body = {
      data: {
        roomId: this.room?.id,
        team_name: teamName,
        user_name: this.userStore.user.name,
        move_to: "team" // team/spectator
      },
    };

    const result = await connection.invoke("MovePlayer", body);

    if (result.value.status === "success"){
      this.room = result.value.data;
    }
    
    if (result.value.status === "error") {
      toast.error(result.value.error);
      return;
    } 
  };
}

export const rootStore = new RootStore();
