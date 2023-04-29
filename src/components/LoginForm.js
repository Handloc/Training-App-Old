import { useState } from "react";

function LoginForm() {
  const [authState, setAuthState] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function changeAuthType() {
    setAuthState(!authState);
  }

  return (
    <form className="border-slate-800 border-2 w-4/5 md:w-2/5 lg:w-2/5 xl:w-1/5 h-96 rounded-xl m-auto mt-40 flex items-center justify-center flex-col">
      <input
        className="w-4/5 h-10 mb-3 border-b-4 border-transparent rounded-md focus:outline-none focus:border-b-4 focus:border-fuchsia-600 p-3 bg-slate-500 text-white "
        placeholder="E-mail"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="w-4/5 h-10 mb-3 border-b-4 border-transparent rounded-md focus:outline-none focus:border-b-4 focus:border-fuchsia-600 p-3 bg-slate-500 text-white"
        placeholder="Password (min. 8 characters)"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {!authState && (
        <input
          className="w-4/5 h-10 mb-3 border-b-4 border-transparent rounded-md focus:outline-none focus:border-b-4 focus:border-fuchsia-600 p-3 bg-slate-500 text-white"
          placeholder="Confirm password"
          type="password"
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
      )}

      <p
        className="mb-3 text-slate-500 hover:cursor-pointer hover:text-white"
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
