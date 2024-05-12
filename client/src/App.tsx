import { RouterProvider } from "react-router-dom";
import { router } from "src/pages/router";
import * as SignalR from "@microsoft/signalr";

const connection = new SignalR.HubConnectionBuilder()
  .withUrl("http://localhost:3000/room", {
    skipNegotiation: true,
    transport: SignalR.HttpTransportType.WebSockets
  })
  .build();

connection.start()
  .then(() => console.log('Connected to SignalR hub'))
  .then(() => connection.invoke("JoinRoom"))
  .catch(err => console.error('Error connecting to hub:', err));

connection.on('UpdateRoom', function() {
  console.log('123');
});

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
