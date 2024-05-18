import { makeAutoObservable } from "mobx";
import { Room } from "../../../shared/types";
import axios from "axios";
import { UserStore } from "./userStore";
import { SocketStore } from "./socketStore";

export class RootStore {
  userStore: UserStore;

  socketStore;

  rooms!: Room[];

  room: Room | null = null;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.socketStore = new SocketStore(this);

    this.getRooms();


    this.socketStore.connection.on("UpdateRoom", (room) => {
      this.room = room;
    })
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
}

export const rootStore = new RootStore();
