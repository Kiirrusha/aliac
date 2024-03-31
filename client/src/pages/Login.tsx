import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { rootStore } from "src/stores/RootStore";

export const Login: FC = observer(() => {
  const user_name = rootStore.userStore.user?.name;

  const [input, setInput] = useState<string>("");

  const handleClose = () => {
    if (input.length <= 0) return;
    rootStore.userStore.setUser({ name: input });
  };

  if (user_name) return <Navigate to={`/`} />;

  return (
    <>
      <h4>Выберите псевдоним</h4>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleClose} disabled={!input.length}>
          Выбрать
        </button>
      </div>
    </>
  );
});
