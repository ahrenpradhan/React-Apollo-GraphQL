import { createSelector } from "reselect"; // ... for memoization

// input selector (doesnot use createSelector)
const selectUser = (state) => state.user;

// output selector (uses createSelector)  ... for memoization
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const setCurrentUser = (user) => {
  // for both thunks and saga
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
};

// Saga Actions
export const userSignIn = (credentials) => {
  return {
    type: "USER_SIGN_IN",
    payload: credentials,
  };
};

export const userSignUp = (data) => {
  return {
    type: "USER_SIGN_UP",
    payload: data,
  };
};

export const googleSignIn = () => {
  return {
    type: "GOOGLE_SIGN_IN",
  };
};

export const authenticateUserSession = () => ({
  type: "AUTHENTICATE_USER_SESSION",
});

export const userSignOut = () => {
  return {
    type: "USER_SIGN_OUT",
  };
};
