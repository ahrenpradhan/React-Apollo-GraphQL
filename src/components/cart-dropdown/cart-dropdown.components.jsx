import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { selectCartItems, toggleCartDetails } from "../../actions/cart.actions";
import CartItem from "../cart-items/cart-items.component";
import CustomButton from "../custom-button/custom-button.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = (props) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {props.cartItems.length ? (
        props.cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        props.history.push("/checkout");
        props.dispatch(toggleCartDetails());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = (state) => {
  return { cartItems: selectCartItems(state) }; // though redux check props by shallow equality and will prevent re-rendering.
};

export default withRouter(connect(mapStateToProps)(CartDropdown));
