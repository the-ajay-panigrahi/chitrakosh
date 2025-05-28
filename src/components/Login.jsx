import React, { useRef, useState } from "react";
import { checkFormValidation } from "../utils/formValidate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const photoURL = useRef(null);

  const handleAuthentication = () => {
    const notValid = checkFormValidation(
      email.current.value,
      password.current.value
    );

    setError(notValid);

    if (notValid) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: photoURL.current.value,
          })
            .then(() => {
              const { email, displayName, photoURL, uid } = auth.currentUser;
              dispatch(addUser({ email, displayName, photoURL, uid }));
              navigate("/browse");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div className="bg-[url(bg.png)] w-screen h-screen bg-no-repeat bg-cover flex justify-center items-center">
      <div className="pt-4 cursor-pointer absolute top-0">
        <img
          src="logo.png"
          alt="logo"
          className="w-32 hover:scale-125 transition-all duration-150 ease-in-out mx-auto md:mx-14"
        />
      </div>
      <div className="bg-black/90 flex flex-col justify-evenly items-center text-white w-[95%] max-w-lg rounded-2xl px-5 lg:px-14 py-10">
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
              ref={name}
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

          {!isSignInForm && (
            <input
              className="bg-slate-700 font-medium rounded-lg px-4 py-3"
              type="text"
              placeholder="Enter your profile url"
              ref={photoURL}
            />
          )}

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
