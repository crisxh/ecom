import React, { useState } from "react";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import { useDispatch } from "react-redux";

import { signUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Your passwords do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormField();
    } catch (err) {
      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Cannot create a new user, this email is already in our database.');
      } else {
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
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
