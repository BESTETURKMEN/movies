import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import RouteWrapper from "./config/routeWrapper";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <HashRouter>
      <RouteWrapper />
    </HashRouter>
  </>
);
reportWebVitals();
