import React from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";

const CartIcon = (props) => {
  return (
    <div className="shopping-cart" onClick={props.toggleCartDetails}>
      <ShoppingCartIcon className="shopping-cart-icon" />
      <span className="shopping-cart-count">{props.totalCount}</span>
    </div>
  );
};

export default CartIcon;
