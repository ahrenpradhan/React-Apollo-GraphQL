import React, { useEffect, useRef, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { default as Header } from "./components/header/header.container";
import CheckoutPage from "./pages/checkout/checkout.component";
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
