import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";
import style from "./Home.module.scss";

export const Home: FC = observer(() => {
  if (!rootStore.userStore.user?.name) return <Navigate to={`/login`} />;

  return (
    <div className="app">
      <hr />
      <div className={style.room}>
        <h3 className={style.title}>Доступные комнаты</h3>
        <ul className="rooms">
          {rootStore.rooms.map((room) => (
            <div
              key={room.id}
              className="room"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <li>{room.id}</li>
              <Link to={`/room/${room.id}`}>
                <button>Подключиться</button>
              </Link>
            </div>
          ))}
        </ul>
      </div>
      <hr />
      <button className={style.button} onClick={rootStore.addRoom}>
        Создать комнату
      </button>
    </div>
  );
});
