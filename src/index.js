import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./Root";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.Fragment>
    <Root />
  </React.Fragment>,
  document.getElementById("root")
);
serviceWorker.unregister();
