import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchCollections } from "../../actions/collections.actions";
import CategoryPage from "../../components/category-page/category-page.component";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import {
  collectionsSnapshotToMap,
  fireStore,
} from "../../firebase/firebase.utils";
import WithSpinner from "../../hoc/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

const ShopPage = ({ match, fetchCollections }) => {
  const [loading, setLoading] = useState(true);
  const unsubscribeFromSnapshot = useRef(null);

  useEffect(() => {
    (async () => {
      await fetchCollections();
      setLoading(false);
    })();

    /*  Earlier
    const collectionRef = fireStore.collection("collections");
    unsubscribeFromSnapshot.current = collectionRef.onSnapshot(
      async (collectionSnapshot) => {
        const collectionsMap = collectionsSnapshotToMap(collectionSnapshot);
        getCollections(collectionsMap);
        setLoading(false);
      }
    );
    */
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        // component={CollectionOverview}
        render={(props) => (
          <CollectionOverviewWithSpinner isLoading={loading} {...props} /> // with HOC
        )}
      />
      <Route
        exact
        path={`${match.path}/:categoryId`}
        // component={CategoryPage}
        render={(props) => (
          <CategoryPageWithSpinner isLoading={loading} {...props} /> // with HOC
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollections: () => dispatch(fetchCollections()),
  };
};

export default connect(null, mapDispatchToProps)(ShopPage);
