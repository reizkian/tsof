import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import store from "system/redux/store";
import { Provider } from "react-redux";

import 'simplebar/src/simplebar.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
