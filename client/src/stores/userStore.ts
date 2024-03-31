import { makeAutoObservable } from "mobx";
import { User } from "../../../shared/types";

export class UserStore {
  private userName = localStorage.getItem("user_name");

  user!: User;

  constructor() {
    makeAutoObservable(this);
    if (this.userName) this.user = { name: this.userName };
  }

  setUser = (user: User) => {
    this.user = user;
    localStorage.setItem("user_name", user.name);
  };
}
