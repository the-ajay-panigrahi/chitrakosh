import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkFormValidation } from "../utils/formValidate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [error, setError] = useState("");
  const email = useRef(null);
  const password = useRef(null);

  const handleAuthentication = () => {
    const notValid = checkFormValidation(
      email.current.value,
      password.current.value
    );

    setError(notValid);

    if (notValid) return;

    if (!setIsSignInForm) {
      // sigin up
    } else {
      // sign in
    }
  };

  return (
    <div className="bg-[url(bg.png)] w-screen h-screen bg-no-repeat bg-cover flex justify-center items-center">
      <Header />
      <div className="bg-black/90 flex flex-col justify-evenly items-center text-white w-[90%] max-w-md rounded-2xl px-5 lg:px-14 py-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-5 sm:mb-10">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        <form
          className="flex flex-col w-full gap-3"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {!isSignInForm && (
            <input
              className="bg-slate-700 font-medium rounded-lg px-4 py-3"
              type="text"
              placeholder="Enter your full name"
            />
          )}
          <input
            className="bg-slate-700 font-medium rounded-lg px-4 py-3"
            type="email"
            placeholder="Enter your email"
            ref={email}
          />
          <input
            className="bg-slate-700 font-medium rounded-lg px-4 py-3"
            type="password"
            placeholder="Enter your password"
            ref={password}
            autoComplete=""
          />
          {error && (
            <p className="text-red-500 font-medium text-xl text-center mt-2">
              {error}
            </p>
          )}
          <button
            className="bg-red-600 py-3 mt-4 rounded-lg font-medium sm:font-bold text-md sm:text-lg cursor-pointer hover:bg-red-700 transition-colors duration-150"
            onClick={handleAuthentication}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p
          className="text-sm mt-5 sm:text-lg font-medium cursor-pointer hover:text-gray-300"
          onClick={() => {
            setIsSignInForm(!isSignInForm);
          }}
        >
          {isSignInForm
            ? " New to Chitra Kosh? Sign up now."
            : "Already a user? Sign In..."}
        </p>
      </div>
    </div>
  );
};

export default Login;
