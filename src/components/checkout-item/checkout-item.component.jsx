import React from "react";
import { connect } from "react-redux";
import {
  addToCart,
  reduceQuantity,
  removeFromCart,
} from "../../actions/cart.actions";

import "./checkout-item.styles.scss";

const CheckoutItem = ({
  cartItem,
  addToCart,
  reduceQuantity,
  removeFromCart,
}) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => reduceQuantity(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addToCart(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => removeFromCart(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item) => dispatch(removeFromCart(item)),
    addToCart: (item) => dispatch(addToCart(item)),
    reduceQuantity: (item) => dispatch(reduceQuantity(item)),
  };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);
