import { RouterProvider } from "react-router-dom";
import { router } from "src/pages/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
