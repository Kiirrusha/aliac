import { observer } from "mobx-react-lite";
import { FC } from "react";
import { SelectUserNameDialog } from "src/components/SelectUserNameDialog";

export const Login: FC = observer(() => {
  return <SelectUserNameDialog />;
});
