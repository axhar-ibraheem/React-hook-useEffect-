import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/authContext";
import Input from "../UI/Input/input";

const INITIAL_STATE = {
  value: "",
  isValid: null,
};

const emailReducer = (state, action) => {
  switch (action.type) {
    case "user_input":
      return {
        value: action.value,
        isValid: action.value.includes("@"),
      };
    case "input_blur":
      return {
        value: state.value,
        isValid: state.value.includes("@"),
      };
    default:
      return state;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "user_input":
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    case "input_blur":
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    default:
      return state;
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, INITIAL_STATE);
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    INITIAL_STATE
  );
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "user_input", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "user_input", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "input_blur" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "input_blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailState.isValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-mail"
          type="email"
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="password"
          type="password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
