import { all, call } from "@redux-saga/core/effects";
import { fetchAllCollections } from "../sagas/shop.sagas";
import { userSagas } from "../sagas/user.sagas";

export default function* rootSaga() {
  yield all([call(fetchAllCollections), call(userSagas)]);
}
