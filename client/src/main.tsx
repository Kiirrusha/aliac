import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  MantineProvider,
  SegmentedControl,
  Switch,
  Title,
  createTheme,
} from "@mantine/core";

const theme = createTheme({
  defaultRadius: "lg",
  fontFamily: "K2D, Montserrat",
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
    SegmentedControl: SegmentedControl.extend({
      defaultProps: {
        bg: "#EC6D75",
        fullWidth: true,
        withItemsBorders: false,
        color: "#C65A61",
        styles: { label: { color: "white" } },
      },
    }),
    Switch: Switch.extend({
      defaultProps: {
        color: "#C65A61",
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
