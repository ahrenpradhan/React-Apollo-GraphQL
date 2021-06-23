import React from "react";
import { Route } from "react-router-dom";
import CategoryPage from "../../components/category-page/category-page.component";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";

const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route
        exact
        path={`${match.path}/:categoryId`}
        component={CategoryPage}
      />
    </div>
  );
};

export default ShopPage;
