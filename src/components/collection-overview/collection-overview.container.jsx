import React from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Spinner from "../spinner/spinner.component";
import CollectionOverview from "./collection-overview.component";

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionOverviewContainer = () => {
  return (
    <Query query={GET_COLLECTIONS}>
      {({ loading, data }) => {
        if (loading) return <Spinner />;
        else return <CollectionOverview collections={data.collections} />;
      }}
    </Query>
  );
};

export default CollectionOverviewContainer;
