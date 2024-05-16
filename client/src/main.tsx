import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { MantineProvider, Title, createTheme } from "@mantine/core";

const theme = createTheme({
  defaultRadius: "lg",
  fontFamily: "K2D",
  fontSmoothing: true,
  headings: {
    sizes: {
      h2: { fontSize: "32px" },
    },
  },
  components: {
    Title: Title.extend({
      defaultProps: {
        c: "white",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
    <ToastContainer />
  </React.StrictMode>
);
