import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PocketProvider } from "./pocketconexion.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <PocketProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </PocketProvider>
);
