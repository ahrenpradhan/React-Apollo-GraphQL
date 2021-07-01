import React, { useEffect, useRef, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import {
  addDataToFirestore,
  auth,
  createUserProfileDocument,
} from "./firebase/firebase.utils";
import {
  authenticateUserSession,
  selectCurrentUser,
  setCurrentUser,
} from "./actions/user.actions";
import { selectCollectionsForPreview } from "./actions/collections.actions";

function App(props) {
  const unsubscribeFromAuth = useRef(null);

  useEffect(() => {
    // We executed Sign In/Up with redux saga
    props.authenticateUserSession();

    // onAuthStateChanged listener listens for any auth changes
    /* 
    unsubscribeFromAuth.current = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // onSnapshot listener listener for any update on snapshot (document)
        userRef.onSnapshot((snapShot) => {
          props.setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      // when signed out
      props.setCurrentUser(userAuth);

      // For adding data into Firestore
      // addDataToFirestore(
      //   "collections",
      //   props.collections.map(({ title, items }) => {
      //     return { title, items };
      //   })
      // );
    });
    
    return () => {
      unsubscribeFromAuth.current();
    };
          */
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
}

// Without Memoization (// though redux check props by shallow equality and will prevent re-rendering but using reselect will help us to prvent recalculation of logic)
/*
const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
*/

// With Memoization
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collections: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUserSession: () => dispatch(authenticateUserSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
