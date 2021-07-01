import { takeLatest, delay, put, take, takeEvery } from "redux-saga/effects";

export function* onIncrement() {
  yield delay(3000);
  yield console.log("I am incremented");
  //   yield put({ type: "INCREMENT_FROM_SAGA" });
}

export function* incrementSaga() {
  // take only runs once and doesnot take second argument(callback) unlike takeEvery
  // take will not invoke generator function once it has executed completely
  yield take("INCREMENT");
  yield onIncrement();
}

export function* incrementSaga() {
  // takeEvery invokes generator function again after completing the execution,
  // hence will execute on every action call and does take second argument(callback) unlike take.
  yield takeEvery("INCREMENT", onIncrement);
}

export function* incrementSaga() {
  // takeLatest invokes generator function again after completing the execution,
  // And will execute only on latest action call and does take second argument(callback) like takeEvery.
  yield takeLatest("INCREMENT", onIncrement);
}
