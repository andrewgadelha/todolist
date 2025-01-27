import React from "react";
import ReactDOM from "react-dom/client";

// Ou o caminho correto para o CSS
import App from "./App";
import "./index.css";
import '@fontsource/orbitron';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
