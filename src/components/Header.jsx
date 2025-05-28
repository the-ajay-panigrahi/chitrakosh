import React from "react";

const Header = () => {
  return (
    <div className="pt-4 cursor-pointer absolute top-0">
      <img
        src="logo.png"
        alt="logo"
        className="w-32 hover:scale-125 transition-all duration-150 ease-in-out mx-auto md:mx-14"
      />
    </div>
  );
};

export default Header;
