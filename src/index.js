import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import "./index.css";
import App from "./App";
import { store, persistor } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* PersistGate helps to REHYDRATE the store on refresh */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
