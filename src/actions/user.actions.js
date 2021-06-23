import { createSelector } from "reselect"; // ... for memoization

// input selector (doesnot use createSelector)
const selectUser = (state) => state.user;

// output selector (uses createSelector)  ... for memoization
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const setCurrentUser = (user) => {
  return {
    type: "SET_CURRENT_USER",
    payload: user,
  };
};
