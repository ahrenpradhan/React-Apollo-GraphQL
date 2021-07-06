import {gql} from '@apollo/client'
import { Mutation, Query } from "@apollo/client/react/components";
import Spinner from "../spinner/spinner.component";
import CategoryPage from "./category-page.component";

const GET_COLLECTIONS_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
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

const CategoryPageContainer = (props) => {
  return (
    <Query
      query={GET_COLLECTIONS_BY_TITLE}
      variables={{ title: props?.match?.params?.categoryId }}
    >
      {({ loading, data }) => {
        return loading ? (
          <Spinner />
        ) : (
          <CategoryPage category={data.getCollectionsByTitle} />
        );
      }}
    </Query>
  );
};

export default CategoryPageContainer;
