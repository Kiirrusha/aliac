import { autorun, makeAutoObservable, toJS } from "mobx";
import axios from "axios";
import { UserStore } from "./userStore";
import { SocketStore } from "./socketStore";
import { Room } from "src/shared/types/general";
import { GameStore } from "./GameStore";

export class RootStore {
  userStore: UserStore;

  socketStore;

  gameStore;

  rooms!: Room[];

  room: Room | null = null;

  isLoaded: boolean;

  constructor() {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.socketStore = new SocketStore(this);
    this.gameStore = new GameStore(this);
    this.isLoaded = false;

    this.getRooms();
    autorun(() => {
      console.log(toJS(this.room));
    })

    this.socketStore.connection.on("UpdateRoom", (room) => {
      this.room = room;
    });
    this.socketStore.connection.on("RoundStarted", (room) => {
      console.log("RoundStarted", room);
      this.room = room;
    });
    this.socketStore.connection.on("RoundEnded", (room) => {
      console.log("RoundEnded", room);
      this.room = room;
    });
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
