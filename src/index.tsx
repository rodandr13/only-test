import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(
  <StrictMode>
    <h1></h1>
  </StrictMode>
);
