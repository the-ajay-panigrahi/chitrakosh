import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/store/userSlice";
import { setShowSearch } from "../utils/store/geminiSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showSearch = useSelector((store) => store.gemini.enableSearch);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(addUser({ uid, displayName, email, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode + " - " + errorMessage);
    }
  };

  return (
    <div
      className={
        user
          ? "z-40 px-24 flex items-center justify-between bg-gradient-to-b from-black text-white absolute top-0 w-full"
          : "hidden"
      }
    >
      <img
        src="/logo.png"
        alt="logo"
        className="py-4 px-2 cursor-pointer transition-all duration-150 hover:scale-110 w-20"
      />
      {user && (
        <div className="flex gap-4">
          <button
            className="font-bold text-md cursor-pointer bg-purple-700 px-2 py-2 rounded-lg hover:bg-purple-800 transition-colors duration-150"
            onClick={() => {
              dispatch(setShowSearch());
            }}
          >
            {showSearch ? "Home" : "AI Movie Search"}
          </button>
          <img
            src={user && user.photoURL ? user.photoURL : "/default-user.png"}
            alt="user-img"
            className="w-10 rounded-lg cursor-pointer hover:scale-110 transition-all duration-150"
            title={user?.displayName}
          />
          <button
            className="font-bold text-lg cursor-pointer"
            onClick={handleSignOut}
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
