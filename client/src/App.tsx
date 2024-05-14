import { RouterProvider } from "react-router-dom";
import { router } from "src/pages/router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
