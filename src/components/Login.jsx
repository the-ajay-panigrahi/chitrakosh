import React, { useRef, useState } from "react";
import Header from "./Header";
import validateForm from "../utils/formValidation.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const name = useRef(null);
  const userEmail = useRef(null);
  const password = useRef(null);
  const profileURL = useRef(null);

  const handleFormValidation = async () => {
    setError(null);

    const message = validateForm(
      name?.current?.value,
      userEmail?.current?.value,
      password?.current?.value
    );
    if (message) {
      setError(message);
      return;
    }

    if (!isSignInForm) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userEmail.current.value,
          password.current.value
        );

        await updateProfile(auth.currentUser, {
          displayName: name.current.value,
          photoURL: profileURL.current.value,
        });

        const { uid, displayName, email, photoURL } = auth.currentUser;
        dispatch(addUser({ uid, displayName, email, photoURL }));
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " - " + errorMessage);
        setError(errorMessage);
      }
    } else {
      try {
        await signInWithEmailAndPassword(
          auth,
          userEmail.current.value,
          password.current.value
        );
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " - " + errorMessage);
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="absolute top-0 h-screen w-screen ">
        <img
          src="/bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <Header />
      <div className="relative z-30 bg-black/95 m-3 text-white md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 rounded-xl">
        <h1 className="text-2xl md:text-4xl text-center font-bold mb-4 md:mb-7 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <form onSubmit={(event) => event.preventDefault()}>
          {!isSignInForm && (
            <input
              className="bg-white text-black placeholder:text-black px-3 rounded font-medium py-1 md:py-3 w-full text-md md:text-lg mb-2 md:mb-3"
              type="text"
              placeholder="Enter your full name"
              ref={name}
            />
          )}
          <input
            className="bg-white text-black placeholder:text-black px-3 rounded font-medium py-1 md:py-3 w-full text-md md:text-lg mb-2 md:mb-3"
            type="email"
            placeholder="Enter your email"
            ref={userEmail}
          />
          <input
            className="bg-white text-black placeholder:text-black px-3 rounded font-medium py-1 md:py-3 w-full text-md md:text-lg mb-2 md:mb-3"
            type="password"
            placeholder="Enter your password"
            ref={password}
            autoComplete=""
          />
          {!isSignInForm && (
            <input
              className="bg-white text-black placeholder:text-black px-3 rounded font-medium py-1 md:py-3 w-full text-md md:text-lg mb-2 md:mb-3"
              type="text"
              placeholder="Enter your profile image url"
              ref={profileURL}
            />
          )}
          {error && (
            <>
              <p className="text-xl mb-1 text-red-500 font-bold text-center">
                {error}
              </p>
              {error === "Invalid Password..." && (
                <ul className="bg-black text-center mb-5 font-medium text-md text-red-400">
                  <li>Minimum 8, maximum 15 characters</li>
                  <li>At least 1 lowercase letter</li>
                  <li>At least 1 uppercase letter</li>
                  <li>At least 1 digit</li>
                  <li>At least 1 special character: @.#$!%*?&</li>
                </ul>
              )}
            </>
          )}
          <button
            className="bg-orange-400 w-full py-2 md:py-3 rounded font-bold text-md md:text-lg hover:bg-orange-500 cursor-pointer transition-colors duration-150 mt-2"
            onClick={handleFormValidation}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p
          className="font-medium text-center mt-2 md:mt-5 hover:text-gray-300 cursor-pointer"
          onClick={() => setIsSignInForm(!isSignInForm)}
        >
          {isSignInForm
            ? "New to Chitra Kosh? sign up now!"
            : "Already a user? sign in now!"}
        </p>
      </div>
    </div>
  );
};

export default Login;
