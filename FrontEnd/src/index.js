import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AllProviders } from "./Contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllProviders>
      <App />
    </AllProviders>
  </React.StrictMode>
);
