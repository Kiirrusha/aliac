import { makeAutoObservable } from "mobx";
import { RootStore } from "./RootStore";
import { User } from "src/shared/types/general";

export class UserStore {
  private userName = localStorage.getItem("user_name");
  rootStore;
  user!: User;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    if (this.userName) this.user = { name: this.userName };
  }

  setUser = (user: User) => {
    this.user = user;
    localStorage.setItem("user_name", user.name);
  };

  logout = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.user as any) = undefined;
    localStorage.removeItem("user_name");
  };
}
