import { gql } from "apollo-boost";
import { Mutation, Query } from "react-apollo";
import { GET_CART_ITEMS } from "../../resolvers/cartResolvers";
import CartDropdown from "./cart-dropdown.components";

const TOGGLE_CART_DETAILS = gql`
  mutation ToggleCartDetails {
    toggleCartDetails @client
  }
`;

const CartDropdownContainer = () => {
  return (
    <Mutation mutation={TOGGLE_CART_DETAILS}>
      {(toggleCartDetails) => {
        return (
          <Query query={GET_CART_ITEMS}>
            {({ data }) => (
              <CartDropdown
                cartItems={data.cartItems}
                toggleCartDetails={toggleCartDetails}
              />
            )}
          </Query>
        );
      }}
    </Mutation>
  );
};

export default CartDropdownContainer;
