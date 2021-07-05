import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-in.styles.scss";
import { auth, signInWithGoogle } from "../../utils/firebase.utils";
import { googleSignIn, userSignIn } from "../../actions/user.actions";
import { connect } from "react-redux";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.userSignIn(this.state);

    // without redux
    /*
    try {
      await auth.signInWithEmailAndPassword(
        this.state.email,
        this.state.password
      );
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log("Error while logging in ", error);
    }
    */
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton
              // onClick={signInWithGoogle}
              onClick={this.props.googleSignIn}
              type="button"
              isGoogleSignin
            >
              Signin with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    googleSignIn: () => dispatch(googleSignIn()),
    userSignIn: (credentials) => dispatch(userSignIn(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
