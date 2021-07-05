import { all, call, takeLatest, put } from "@redux-saga/core/effects";
import { setCurrentUser } from "../actions/user.actions";
import {
  auth,
  createUserProfileDocument,
  getCurrentUser,
  provider,
} from "../utils/firebase.utils";

function* createProfile(user, additionalData) {
  try {
    const userRef = yield createUserProfileDocument(user, additionalData);
    const userSnapshot = yield userRef.get();

    yield put(
      setCurrentUser({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    console.log("error while signing in : ", error);
  }
}

function* executeGoogleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(provider);
    yield createProfile(user);
  } catch (error) {
    console.log("err executing Google Sign in : ", error);
  }
}

function* executeUserSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield createProfile(user);
  } catch (error) {
    console.log("err executing User Sign in : ", error);
  }
}

function* executeSignUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield createProfile(user, { displayName });
  } catch (error) {
    console.log("error while signing up : ", error);
  }
}

function* executeAuthentication() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield createProfile(userAuth);
  } catch (error) {
    console.log("Error while authenticating user : ", error);
  }
}

function* executeSignOut() {
  try {
    yield auth.signOut();
    yield put(setCurrentUser(null));
  } catch (error) {
    console.log("Error while signing you out : ", error);
  }
}

export function* googleSignIn() {
  yield takeLatest("GOOGLE_SIGN_IN", executeGoogleSignIn);
}

export function* userSignIn() {
  yield takeLatest("USER_SIGN_IN", executeUserSignIn);
}

export function* userSignUp() {
  yield takeLatest("USER_SIGN_UP", executeSignUp);
}

export function* authenticateUserSession() {
  yield takeLatest("AUTHENTICATE_USER_SESSION", executeAuthentication);
}

export function* userSignOut() {
  yield takeLatest("USER_SIGN_OUT", executeSignOut);
}

export function* userSagas() {
  yield all([
    call(googleSignIn),
    call(userSignIn),
    call(authenticateUserSession),
    call(userSignOut),
    call(userSignUp),
  ]);
}
