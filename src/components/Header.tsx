import React from "react";

const Header = () => {
  return (
    <header className="max-h-16 flex items-center">
      <figure>
        <img
          src="https://www.shutterstock.com/image-vector/colombo-sri-lanka-22-nd-600nw-2350908681.jpg"
          alt="logo"
          className="h-16"
        />
      </figure>
      <nav className="ml-4 space-x-4">
        <a href="">Buy Crypto</a>
        <a href="">Market</a>
        <a href="">Trade</a>
      </nav>
    </header>
  );
};

export default Header;
