import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "../reducers/cart.reducer";
import { userReducer } from "../reducers/user.reducer";
import { directoryReducer } from "../reducers/directory.reducer";
import { shopReducer } from "../reducers/shop.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  directory: directoryReducer,
  cart: cartReducer,
  shop: shopReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
