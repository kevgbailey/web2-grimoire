import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./contexts/AuthContext/AuthContext.jsx";
import GameProvider from "./contexts/GameContext/GameContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GameProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </GameProvider>
  </AuthProvider>
);
