import React from "react";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";
import {
  selectCartItemsCount,
  toggleCartDetails,
} from "../../actions/cart.actions";
import { createStructuredSelector } from "reselect";

const CartIcon = (props) => {
  return (
    <div className="shopping-cart" onClick={props.toggleCartDetails}>
      <ShoppingCartIcon className="shopping-cart-icon" />
      <span className="shopping-cart-count">{props.totalCount}</span>
    </div>
  );
};

// Without Memoization (// though redux check props by shallow equality and will prevent re-rendering but using reselect will help us to prvent recalculation of logic)
/*
const mapStateToProps = ({ cart: { cartItems } }) => {
  return {
    totalCount: cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0),
  };
};
*/

// With Memoization
const mapStateToProps = createStructuredSelector({
  totalCount: selectCartItemsCount,
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartDetails: () => dispatch(toggleCartDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
