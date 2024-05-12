import { RouterProvider } from "react-router-dom";
import { router } from "src/pages/router";
import * as SignalR  from "@microsoft/signalr";

const connection = new SignalR.HubConnectionBuilder()
  .withUrl("ws://localhost:3000/room")
  .build();
  
connection.on("UpdateRoom", (data) => {
  console.log(data);
});


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
