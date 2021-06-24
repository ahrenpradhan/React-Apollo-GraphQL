import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

const WithSpinner = (WrappedComponent) => (props) => {
  return props.isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...props} />
  );
};

// More Descriptive
/*
const WithSpinner = (WrappedComponent) => {
  const Spinner = (props) => {      // ... returning another new component
    return props.isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return Spinner;
};
*/

export default WithSpinner;
