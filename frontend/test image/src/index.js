import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./redux/services/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

const app = (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);
ReactDOM.render(app, document.getElementById("root"));
