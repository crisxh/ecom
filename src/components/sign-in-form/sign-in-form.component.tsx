import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './sign-in-form.styles.scss'
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {

      dispatch(emailSignInStart(email, password));
      resetFormField();

    } catch (err) {
      if((err as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
        alert('Incorrect password for email');
      } else if ((err as AuthError).code === 'auth/user-not-found') {
        alert('No user associated with this email');
      }  else {
        console.log("Error: ", err);
      }

    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
            Sign In
          </Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
