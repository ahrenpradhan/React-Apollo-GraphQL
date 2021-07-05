import { takeEvery, takeLatest, call, put } from "@redux-saga/core/effects";
import { setCollections } from "../actions/collections.actions";
import { collectionsSnapshotToMap, fireStore } from "../utils/firebase.utils";

function* fetchCollections() {
  const collectionRef = fireStore.collection("collections");

  const collectionSnapshot = yield collectionRef.get();

  const collectionsMap = yield call(
    collectionsSnapshotToMap,
    collectionSnapshot
  ); // collectionsSnapshotToMap(collectionSnapshot)

  yield put(setCollections(collectionsMap));
}

export function* fetchAllCollections() {
  yield takeLatest("FETCH_ALL_COLLECTIONS", fetchCollections);
}
