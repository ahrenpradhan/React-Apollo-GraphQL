import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

// GraphQL
import { ApolloProvider } from "react-apollo";

import "./index.css";
import App from "./App";
import { store, persistor } from "./store";
import { client } from "./utils/apollo.utils";

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        {/* PersistGate helps to REHYDRATE the store on refresh */}
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
