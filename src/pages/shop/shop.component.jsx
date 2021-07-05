import React from "react";
import { Route } from "react-router-dom";
import { default as CategoryPage } from "../../components/category-page/category-page.container";
import { default as CollectionOverview } from "../../components/collection-overview/collection-overview.container";

const ShopPage = (props) => {
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${props.match.path}`}
        component={CollectionOverview}
      />
      <Route
        exact
        path={`${props.match.path}/:categoryId`}
        component={CategoryPage}
      />
    </div>
  );
};

export default ShopPage;
