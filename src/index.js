import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

// GraphQL
import { ApolloProvider } from '@apollo/client'

import "./index.css";
import App from "./App";
import { store, persistor } from "./store";
import { getApolloClient } from "./utils/apollo.utils";

/*  for GraphQL see
  1. apollo.utils.js
  2. collection-overview.container
  3. category-page.container 
  4. resolvers
  5. header.container
  6. cart-icon.container
  7. cart-dropdown    -> Mutation + Query
  8. collection-item
*/

const MainApp = () => {
  const [client, setClient] = React.useState(null);
  const [hasLoaded, setHasLoaded] = React.useState(null);
  React.useEffect(() => {
    let _client = getApolloClient();
    setClient(_client);
    setHasLoaded(true)
  }, [])
  return hasLoaded ? (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          {/* PersistGate helps to REHYDRATE the store on refresh */}
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  ) : <></>
}

ReactDOM.render(
  <MainApp />,
  document.getElementById("root")
);
