import { makeAutoObservable } from "mobx";
import { Room } from "../../../shared/types";
import axios from "axios";
import { UserStore } from "./userStore";
import { toast } from "react-toastify";

export class RootStore {
  userStore: UserStore;

  rooms!: Room[];

  room: Room | null = null;

  socket: WebSocket | null = null;

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
    if (this.socket) return;
    const user_name = localStorage.getItem("user_name");
    if (!user_name) return;

    this.socket = new WebSocket(`ws://localhost:3000/room`);

    this.socket.onopen = () => {
      const body = {
        eventType: "join",
        data: {
          roomId,
          user_name,
        },
      };
      this.socket?.send(JSON.stringify(body));
    };

    this.socket.onmessage = (event) => {
      const body = JSON.parse(event.data);

      if (body.data.error) {
        toast.error(body.data.description);
      }

      console.log(body);

      if (body.eventType === "roomUpdate") {
        this.room = body.data;
      }
    };
  };

  leaveRoom = () => {
    if (!this.socket) return;
    this.socket.close();
    this.socket = null;
    this.room = null;
  };

  moveToPlayer = (teamName: string) => {
    if (!this.room) return;
    const body = {
      eventType: "move_to_player",
      data: {
        roomId: this.room?.id,
        teamName: teamName,
        user_name: this.userStore.user.name,
      },
    };
    this.socket?.send(JSON.stringify(body));
  };
}

export const rootStore = new RootStore();
