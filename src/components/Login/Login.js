import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const INITIAL_STATE = {
  value: "",
  isValid: false,
};

const emailReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "user_input":
      return {
        value: action.value,
        isValid: action.value.includes("@"),
      };
    case "user_blur":
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    default:
      return state;
  }
};

const passwordReducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "user_passwd":
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    case "user_blur":
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    default:
      return state;
  }
};
// if (action.type === "user_input") {
//   return { value: action.value, isValid: action.value.includes("@") };
// }
// if (action.type === "user_blur") {
//   return { value: state.value, isValid: state.value.includes("@") };
// }
// return state;

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  // const [enteredCollegeName, setEnteredCollegeName] = useState("");
  // const [collegeNameIsValid, setCollegeNameIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, INITIAL_STATE);
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    INITIAL_STATE
  );

  // useEffect(() => {
  //   console.log("hello");
  //   setFormIsValid(
  //     enteredEmail.includes("@") &&
  //       enteredPassword.trim().length > 6 &&
  //       enteredCollegeName.trim().length > 0
  //   );
  // }, [enteredEmail, enteredPassword, enteredCollegeName]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "user_input", value: event.target.value });
    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "user_passwd", value: event.target.value });

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };
  // const collegeNameChangeHandler = (event) => {
  //   setEnteredCollegeName(event.target.value);
  // };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "input_blur" });
  };

  // const validateCollegeNameHandler = () => {
  //   setCollegeNameIsValid(enteredCollegeName.trim().length > 0);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {/* <div
          className={`${classes.control} ${
            collegeNameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
