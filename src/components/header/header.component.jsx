import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser, userSignOut } from "../../actions/user.actions";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { default as CartDropdown } from "../cart-dropdown/cart-dropdown.container";
import { default as CartIcon } from "../cart-icon/cart-icon.container";
import "./header.styles.scss";

const Header = ({ currentUser, hidden, dispatch }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => dispatch(userSignOut())}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {!hidden && <CartDropdown />}
  </div>
);

// With Memoization and using createStructuredSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
