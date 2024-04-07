import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const Home: FC = observer(() => {
  if (!rootStore.userStore.user?.name) return <Navigate to={`/login`} />;

  return (
    <div>
      <hr />
      <div>
        <h3>Доступные комнаты</h3>
        <ul>
          {rootStore.rooms.map((room) => (
            <div
              key={room.id}
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
      <button onClick={rootStore.addRoom}>Создать комнату</button>
    </div>
  );
});
