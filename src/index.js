import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reduxStore from "./store/store";
import { ThemeProvider } from "@mui/system";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { createTheme } from "@mui/material/styles";
import { deepPurple, cyan } from "@mui/material/colors";
const store = reduxStore();
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: deepPurple,
    default: {
      main: "#64748B",
      contrastText: "#fff",
    },
    tertiary: {
      main: cyan,
    },
  },
});

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
