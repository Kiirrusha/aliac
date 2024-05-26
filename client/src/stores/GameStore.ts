import { makeAutoObservable } from "mobx";

import { toast } from "react-toastify";
import { RootStore } from "./RootStore";

export class GameStore {
  gameState: "starting" | "running" | "waiting" = "starting";

  countdown: number;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.countdown = rootStore.room?.roundTime || 60;
  }

  startCountdown = () => {
    const idInterval = setInterval(() => {
      this.countdown--;
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  };

  //   joinRoom = async (roomId: string) => {
  //     const user_name = this.rootStore.userStore.user.name;

  //     try {
  //       const body = {
  //         data: {
  //           roomId,
  //           user_name,
  //         },
  //       };

  //       const result = await this.connection.invoke("JoinRoom", body);

  //       if (result.value.status === "success") {
  //         this.rootStore.room = result.value.data;
  //       }

  //       if (result.value.status === "error") {
  //         toast.error(result.value.error);
  //         return;
  //       }
  //     } catch (error) {
  //       console.error("Какая то ошибка:", error);
  //     }
  //   };
}
