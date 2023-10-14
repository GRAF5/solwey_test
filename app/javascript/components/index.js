import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

document.addEventListener("turbo:load", () => {
  const d = document.createElement("div");
  d.setAttribute("id", "root");
  const root = createRoot(
    document.body.appendChild(d)
  );
  root.render(<App />);
});