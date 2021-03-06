import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import "./collection-item.styles.scss";

const CollectionItem = (props) => {
  const { id, name, price, imageUrl } = props.item;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <CustomButton inverted onClick={() => props.addToCart(props.item)}>
        Add to Cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
