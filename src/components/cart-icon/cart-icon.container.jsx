import { gql } from "apollo-boost";
import { Mutation, Query } from "react-apollo";
import { GET_TOTAL_CART_ITEMS } from "../../resolvers/cartResolvers";
import CartIcon from "./cart-icon.components";

const TOGGLE_CART_DETAILS = gql`
  mutation ToggleCartDetails {
    toggleCartDetails @client
  }
`;

const CartIconContainer = () => {
  return (
    <Mutation mutation={TOGGLE_CART_DETAILS}>
      {(toggleCartDetails) => (
        <Query query={GET_TOTAL_CART_ITEMS}>
          {({ data }) => (
            <CartIcon
              toggleCartDetails={toggleCartDetails}
              totalCount={data.totalCartItems}
            />
          )}
        </Query>
      )}
    </Mutation>
  );
};

export default CartIconContainer;
