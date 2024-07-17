import React from "react";
import Button from "../components/Button/Button";

const Login = () => {
  return (
    <div className="max-w-96 mx-auto flex flex-col border border-[#2B3139] py-8 px-8 rounded-xl">
      <h1 className="text-3xl">Welcome to Binance</h1>
      <span className="mt-8 font-normal">Email/Phone number</span>
      <input
        type="text"
        className="bg-inherit border border-gray-700 px-4 py-2 rounded-lg mt-1
         hover:border-yellow-400 duration-300 focus:border-yellow-400 
         focus:outline-none"
      />
      <span className="my-4 font-normal text-sm">
        By creating an account, I agree to Binance's Terms of Service and
        Privacy Policy
      </span>
      <Button nameBtn="Next" onClickBtn={() => {}} />
    </div>
  );
};

export default Login;
