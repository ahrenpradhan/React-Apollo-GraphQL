import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

// redux-thunk
// const middlewares = [thunk];

// redux-saga
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// When deployed CRA set the NODE_ENV to "production"
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
