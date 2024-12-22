import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TaksProvider } from "./Components/Consext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaksProvider>
      <App />
    </TaksProvider>
  </StrictMode>
);
