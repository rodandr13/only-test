import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./styles/globalStyles.scss";
import { App } from "./components/app/App";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
