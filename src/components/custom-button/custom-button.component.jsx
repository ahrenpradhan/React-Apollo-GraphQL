import React from "react";

import "./custom-buttom.styles.scss";
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({
  children,
  isGoogleSignin,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? "inverted" : ""} ${
      isGoogleSignin ? "google-signin" : ""
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

// Using Styled Component
// const CustomButton = (props) => (
//   <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
// );

export default CustomButton;
