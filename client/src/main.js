import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./App.css";

createRoot(document.querySelector(".app")).render(
  <div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>
);
