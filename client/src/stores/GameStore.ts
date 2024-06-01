import { makeAutoObservable, toJS } from "mobx";
import { RootStore } from "./RootStore";

export class GameStore {
  gameState: "starting" | "running" | "waiting" | "ending" = "starting";

  isTeamGuess = true;

  isLeader = false;

  words: string[] = ["Руслан", "Ryslan", "midle++++ Ryslan"];

  guessedWords: string[] = [];

  unguessedWords: string[] = [];

  roundScore = 0;

  countdown: number;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.countdown = rootStore.room?.roundTime || 60;
    this.recoverLocalStorage();
  }

  startCountdown = () => {
    const idInterval = setInterval(() => {
      this.countdown--;
    }, 1000);

    return () => {
      clearInterval(idInterval);
    };
  };

  saveToLoaclStorage = () => {
    localStorage.setItem(
      "words",
      JSON.stringify([this.words, this.guessedWords, this.unguessedWords])
    );
  };

  recoverLocalStorage = () => {
    const JsonWords = localStorage.getItem("words");
    if (!JsonWords) return;
    const words = JSON.parse(JsonWords);
    this.words = words[0];
    this.guessedWords = words[1];
    this.unguessedWords = words[2];
  };

  onYesClick = () => {
    const word = this.words.pop();
    if (word) this.guessedWords.push(word);
    // this.saveToLoaclStorage();
  };

  onNoClick = () => {
    const word = this.words.pop();
    if (word) this.unguessedWords.push(word);
    // this.saveToLoaclStorage();
  };

  debugerClick = (value: "gameState" | "isTeamGuess" | "isLeader") => {
    if (value === "gameState") {
      if (this.gameState === "starting") return (this.gameState = "waiting");
      if (this.gameState === "waiting") return (this.gameState = "running");
      if (this.gameState === "running") return (this.gameState = "ending");
      if (this.gameState === "ending") return (this.gameState = "starting");
    }
    if (value === "isTeamGuess") this.isTeamGuess = !this.isTeamGuess;
    if (value === "isLeader") this.isLeader = !this.isLeader;
    console.log(this.gameState);
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
