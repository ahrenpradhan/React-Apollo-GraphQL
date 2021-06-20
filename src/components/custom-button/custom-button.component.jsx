import React from "react";

import "./custom-buttom.styles.scss";

const CustomButton = ({ children, isGoogleSignin, ...otherProps }) => (
  <button
    className={`${isGoogleSignin ? "google-signin" : ""} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
