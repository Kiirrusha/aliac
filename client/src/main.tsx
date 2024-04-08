import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  defaultRadius: "lg",
  fontFamily: "K2D",
  fontSmoothing: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
    <ToastContainer />
  </React.StrictMode>
);
