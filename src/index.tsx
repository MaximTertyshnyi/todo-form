import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToDoPage from "./pages/ToDoPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToDoPage />
  </React.StrictMode>
);
