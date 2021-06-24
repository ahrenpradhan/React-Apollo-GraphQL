import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../actions/collections.actions";
import CollectionItem from "../collection-item/collection-item.component";
import "./category-page.styles.scss";

const CategoryPage = (props) => {
  return (
    <div className="category-page">
      <h2 className="title">{props?.category?.title}</h2>
      <div className="items">
        {props?.category?.items.map((item) => (
          <CollectionItem key={item.key} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    category: selectCollection(ownProps?.match?.params?.categoryId)(state),
  };
};

export default connect(mapStateToProps)(CategoryPage);
