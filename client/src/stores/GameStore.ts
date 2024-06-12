import { makeAutoObservable, toJS } from "mobx";
import { RootStore } from "./RootStore";
import { GAME_STATE } from "src/shared/types/general";



export class GameStore {
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

  get gameState() {
    if (this.rootStore.room) return GAME_STATE[this.rootStore.room.gameState as keyof typeof GAME_STATE];
    return null;
  }

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

  startGame = async () => {
    const body = this.rootStore.room?.id;

    console.log(body);
    await this.rootStore.socketStore.connection.invoke("StartGame", body);
  };

  startRound = async () => {
    const body = this.rootStore.room?.id;

    console.log(body);
    await this.rootStore.socketStore.connection.invoke("StartRound", body);
  };
}
