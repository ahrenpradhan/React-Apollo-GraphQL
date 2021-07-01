import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCartIsHidden } from "../../actions/cart.actions";
import { selectCurrentUser, userSignOut } from "../../actions/user.actions";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartDropdown from "../cart-dropdown/cart-dropdown.components";
import CartIcon from "../cart-icon/cart-icon.components";
import {
  HeaderContainer,
  LogoContainer,
  OptionDiv,
  OptionLink,
  OptionsContainer,
} from "./header.styles";

import "./header.styles.scss";

const Header = ({ currentUser, hidden, dispatch }) => (
  // <div className="header">
  //   <Link className="logo-container" to="/">
  //     <Logo className="logo" />
  //   </Link>
  //   <div className="options">
  //     <Link className="option" to="/shop">
  //       SHOP
  //     </Link>
  //     <Link className="option" to="/shop">
  //       CONTACT
  //     </Link>
  //     {currentUser ? (
  //       <div className="option" onClick={() => auth.signOut()}>
  //         SIGN OUT
  //       </div>
  //     ) : (
  //       <Link className="option" to="/signin">
  //         SIGN IN
  //       </Link>
  //     )}
  //     <CartIcon />
  //   </div>
  //   {!hidden && <CartDropdown />}
  // </div>

  // Using Styled Components
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink className="option" to="/shop">
        SHOP
      </OptionLink>
      <OptionLink className="option" to="/shop">
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionDiv className="option" onClick={() => dispatch(userSignOut())}>
          SIGN OUT
        </OptionDiv>
      ) : (
        <OptionLink className="option" to="/signin">
          SIGN IN
        </OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {!hidden && <CartDropdown />}
  </HeaderContainer>
);

// Without Memoization (// though redux check props by shallow equality and will prevent re-rendering but using reselect will help us to prvent recalculation of logic)

/* 
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => {
  return {
    currentUser,
    hidden,
  };
}; 
*/

// With Memoization and using createStructuredSelector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartIsHidden,
});

export default connect(mapStateToProps)(Header);
