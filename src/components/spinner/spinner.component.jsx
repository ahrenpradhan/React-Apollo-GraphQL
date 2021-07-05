import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = (props) => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default Spinner;
