import { useEffect, useState } from "react";
import FormInput from "./FormInput";

function LoginForm() {
  const [authState, setAuthState] = useState(true);
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

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

  function resetInputValues() {
    setValues({
      email: "",
      password: "",
      password2: "",
    });
  }

  function changeAuthType() {
    setAuthState(!authState);
    setFormError("");
    setIsValid({
      email: true,
      password: true,
      password2: true,
    });
    resetInputValues();
  }

  async function submitHandler(e) {
    e.preventDefault();
    let targetEmail = 0;
    if (users.length > 0) {
      users.forEach((user) => {
        if (user.user["email"] === values["email"]) {
          targetEmail++;
        }
      });
    }

    if (authState) {
      if (values["email"].length === 0 || values["password"].length === 0) {
        setFormError("All input fields must be filled!");
      } else {
        if (targetEmail.length !== 0) {
          console.log("SIGN IN - EMAIL - SUCCESS");
        } else {
          setFormError("Given e-mail adress is not registered");
        }
      }
    }
    if (!authState) {
      if (
        values["email"].length === 0 ||
        values["password"].length === 0 ||
        values["password2"].length === 0
      ) {
        setFormError("All input fields must be filled!");
      } else {
        if (targetEmail !== 0) {
          setFormError("That e-mail adress is already taken");
        } else {
          const res = await fetch("api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: values["email"],
              password: values["password"],
            }),
          });
          const json = await res.json();
          setUsers([...users, json]);
          resetInputValues();
        }
      }
    }
    targetEmail = 0;
  }

  function valueChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setFormError("");
  }

  function emailValidationHandler() {
    if (!values["email"].match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      setIsValid({ ...isValid, email: false });
    } else {
      setIsValid({ ...isValid, email: true });
    }
  }

  function passwordValidationHandler() {
    if (!values["password"].match(/^(?=.*[A-Z])(?=.*[\W_])(?=.{8,})/)) {
      setIsValid({ ...isValid, password: false });
    } else {
      setIsValid({ ...isValid, password: true });
    }
  }

  function confirmPasswordValidationHandler() {
    if (
      !values["password2"].match(values["password"]) ||
      values["password2"].length === 0
    ) {
      setIsValid({ ...isValid, password2: false });
    } else {
      setIsValid({ ...isValid, password2: true });
    }
  }

  console.log(users);
  return (
    <form
      className="border-slate-800 border-2 w-4/5 md:w-2/5 lg:w-2/5 xl:w-1/5 max-h-fit pt-5 pb-5 rounded-xl m-auto mt-40 flex items-center justify-center flex-col"
      onSubmit={submitHandler}
    >
      <FormInput
        placeholder="E-mail"
        name="email"
        value={values["email"]}
        onChange={valueChange}
        onBlur={emailValidationHandler}
        errorMessage="E-mail must be valid"
        valid={isValid["email"]}
      />
      <FormInput
        placeholder="Password"
        name="password"
        type="password"
        value={values["password"]}
        onChange={valueChange}
        onBlur={passwordValidationHandler}
        errorMessage="Password must be minimum 8 characters long, must contain minimum 1 capital letter and 1 special character"
        valid={isValid["password"]}
      />
      {!authState && (
        <FormInput
          placeholder="Confirm password"
          name="password2"
          type="password"
          value={values["password2"]}
          onChange={valueChange}
          onBlur={confirmPasswordValidationHandler}
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
      <p className="text-red-600 w-4/5 text-center mt-5">{formError}</p>
    </form>
  );
}

export default LoginForm;
