import {gql} from '@apollo/client'
import { Mutation, } from "@apollo/client/react/components";
import CollectionItem from "./collection-item.component";

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CollectionItemContainer = (props) => {
  return (
    <Mutation mutation={ADD_ITEM_TO_CART}>
      {(addItemToCart) => (
        <CollectionItem
          {...props}
          addToCart={(item) => addItemToCart({ variables: { item: item } })}
        />
      )}
    </Mutation>
  );
};

export default CollectionItemContainer;
