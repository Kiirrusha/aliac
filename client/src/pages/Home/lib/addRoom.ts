import { rootStore } from "src/stores/RootStore";

export const addRoom = () => {
  if (rootStore.rooms.length < 7) return rootStore.addRoom();
};
