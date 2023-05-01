import { useState } from "react";
import FormInput from "./FormInput";

function LoginForm() {
  const [authState, setAuthState] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [isValid, setIsValid] = useState({
    email: true,
    password: true,
    password2: true,
  });

  function changeAuthType() {
    setAuthState(!authState);
  }

  function submitHandler(e) {
    e.preventDefault();
  }

  function valueChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function validationHandler(e) {
    if (e.target.name === "email") {
      if (
        !values[e.target.name].match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
      ) {
        setIsValid({ ...isValid, [e.target.name]: false });
      } else {
        setIsValid({ ...isValid, [e.target.name]: true });
      }
    }
    if (e.target.name === "password") {
      if (!values[e.target.name].match(/^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/)) {
        setIsValid({ ...isValid, [e.target.name]: false });
      } else {
        setIsValid({ ...isValid, [e.target.name]: true });
      }
    }
    if (e.target.name === "password2") {
      if (
        !values[e.target.name].match(values["password"]) ||
        values[e.target.name].length === 0
      ) {
        setIsValid({ ...isValid, [e.target.name]: false });
      } else {
        setIsValid({ ...isValid, [e.target.name]: true });
      }
    }
  }
  console.log(isValid);
  return (
    <form
      className="border-slate-800 border-2 w-4/5 md:w-2/5 lg:w-2/5 xl:w-1/5 max-h-fit pt-5 pb-5 rounded-xl m-auto mt-40 flex items-center justify-center flex-col"
      onSubmit={submitHandler}
    >
      <FormInput
        placeholder="E-mail"
        name="email"
        onChange={valueChange}
        onBlur={validationHandler}
        errorMessage="E-mail must be valid"
        valid={isValid["email"]}
      />
      <FormInput
        placeholder="Password"
        name="password"
        onChange={valueChange}
        onBlur={validationHandler}
        errorMessage="Password must be minimum 8 characters long, must contain minimum 1 capital letter and 1 special character"
        valid={isValid["password"]}
      />
      {!authState && (
        <FormInput
          placeholder="Confirm password"
          name="password2"
          onChange={valueChange}
          onFocus={validationHandler}
          errorMessage="Passwords must be the same"
          valid={isValid["password2"]}
        />
      )}
      <p
        className="mt-3 mb-3 text-slate-500 hover:cursor-pointer hover:text-white transition duration-200"
        onClick={changeAuthType}
      >
        {authState && "Create new account"}
        {!authState && "Log in into existing account"}
      </p>
      <button className="w-2/5 h-12 bg-amber-400 hover:bg-fuchsia-600 text-black text-lg font-bold rounded-3xl transition duration-200 ">
        {authState && "Sign in"}
        {!authState && "Sign up"}
      </button>
    </form>
  );
}

export default LoginForm;
