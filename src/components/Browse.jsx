import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import Footer from "./Footer";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="pt-4 flex justify-between max-w-7xl mx-auto items-center">
        <img
          src="logo.png"
          alt="logo"
          className="w-16 hover:scale-125 transition-all duration-150 ease-in-out cursor-pointer"
        />
        <div className="flex gap-4 justify-center items-center">
          <img
            src={user?.photoURL ? user.photoURL : ""}
            alt="user profile"
            title={user?.displayName}
            className="w-12 rounded-full cursor-pointer hover:scale-110 transition-all duration-150 ease-in-out"
          />
          <span
            className="font-bold text-lg cursor-pointer"
            onClick={handleSignOut}
          >
            (Sign out)
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
