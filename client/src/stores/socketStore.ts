import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";

import * as SignalR from "@microsoft/signalr";
import { toast } from "react-toastify";
import { RoomSettings, WordKits } from "src/shared/types/general";

export class SocketStore {
  connection;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);

    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl("http://localhost:3000/room", {
        skipNegotiation: true,
        transport: SignalR.HttpTransportType.WebSockets,
      })
      .build();

    this.connection.start();
  }

  joinRoom = async (roomId: string) => {
    const user_name = this.rootStore.userStore.user.name;

    try {
      const body = {
        data: {
          roomId,
          user_name,
        },
      };

      const result = await this.connection.invoke("JoinRoom", body);

      if (result.value.status === "success") {
        //toast.success("Успешный вход в комнату");
        this.rootStore.room = result.value.data;
      }

      if (result.value.status === "error") {
        toast.error(result.value.error);
        return;
      }
    } catch (error) {
      console.error("Какая то ошибка:", error);
    }
  };

  leaveRoom = async () => {
    const user_name = this.rootStore.userStore.user.name;
    const roomId = this.rootStore.room?.id;
    if (!roomId || !user_name) return;

    const body = {
      data: {
        roomId,
        user_name,
      },
    };

    const result = await this.connection.invoke("LeaveRoom", body);

    if (result.value.status === "success") {
      toast.success("Вы вышли из комнаты");
      this.rootStore.room = null;
    }

    if (result.value.status === "error") {
      toast.error(result.value.error);
      return;
    }
  };

  moveTo = async (to: "team" | "spectator", teamName?: string) => {
    if (!this.rootStore.room) return;

    const body = {
      data: {
        roomId: this.rootStore.room?.id,
        team_name: teamName,
        user_name: this.rootStore.userStore.user.name,
        move_to: to,
      },
    };

    const result = await this.connection.invoke("MovePlayer", body);

    if (result.value.status === "success") {
      this.rootStore.room = result.value.data;
    }

    if (result.value.status === "error") {
      toast.error(result.value.error);
      return;
    }
  };

  saveWordKit = async (wordKits: WordKits) => {
    if (!this.rootStore.room) return;
    const body = {
      data: {
        roomId: this.rootStore.room?.id,
        user_name: this.rootStore.userStore.user.name,
        word_kits: wordKits,
      },
    };

    const result = await this.connection.invoke("SaveWordKit", body);

    if (result.value.status === "success") {
      toast.success("Сохранено");
    }

    if (result.value.status === "error") {
      toast.error(result.value.error);
      return;
    }
  };

  saveRoomSettings = async (roomSettings: RoomSettings) => {
    if (!this.rootStore.room) return;
    const settings = {
      roomId: this.rootStore.room?.id,
      roomSettings: {
        roundTime: roomSettings.roundTime,
        pointsToWin: roomSettings.pointsToWin,
        reducePoints: roomSettings.reducePoints,
      }
    };

    const result = await this.connection.invoke("SaveRoomSettings", settings);

    if (result.value.status === "success") {
      toast.success("Сохранено");
    }

    if (result.value.status === "error") {
      toast.error(result.value.error);
      return;
    }
  };
}
