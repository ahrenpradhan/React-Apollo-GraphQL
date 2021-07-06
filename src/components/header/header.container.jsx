import { Query } from "@apollo/client/react/components";
import { IS_CART_DETAILS_HIDDEN } from "../../resolvers/cartResolvers";
import Header from "./header.component";

const HeaderContainer = () => {
  return (
    <Query query={IS_CART_DETAILS_HIDDEN}>
      {({ data }) => <Header hidden={data?.isCartDetailsHidden || data} />}
    </Query>
  );
};

export default HeaderContainer;
