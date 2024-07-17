import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import React from "react";

const VoteCoin = () => {
  const handleGoodClick = () => {};
  const handleBadClick = () => {};
  return (
    <div className="w-full">
      <section className="flex items-center justify-between mt-10">
        <span className="text-xl">How do you feed about Bitcoin today?</span>
        <div className="flex space-x-4">
          <button
            className="flex bg-[#2B3139] text-[#EAECEF] py-1 px-5 rounded-sm hover:bg-gray-600"
            onClick={() => handleGoodClick()}
          >
            <HandThumbUpIcon className="size-5 mr-2" />
            Good
          </button>
          <button
            className="flex bg-[#2B3139] text-[#EAECEF] py-1 px-5 rounded-sm hover:bg-gray-600"
            onClick={() => handleBadClick()}
          >
            <HandThumbDownIcon className="size-5 mr-2" />
            Bad
          </button>
        </div>
      </section>

      <section className="flex items-center mt-4">
        <div className="flex items-center space-x-2">
          <HandThumbUpIcon className="size-5" />
          <span className="">Good</span>
          <span className="text-green-400">60</span>
        </div>

        <div className="w-full mx-4 bg-gray-400 rounded-lg overflow-hidden">
          <div className="bg-green-500 py-1" style={{ width: "70%" }}></div>
        </div>
        <div className="flex items-center  space-x-2">
          <HandThumbDownIcon className="size-5" />
          <span>Bad</span>
          <span className="text-red-400">14</span>
        </div>
      </section>
      <section className="text-xs text-gray-400 flex items-center mt-4">
        <InformationCircleIcon className="size-4 mr-1" />
        <span>Note: This information is for reference only.</span>
      </section>
    </div>
  );
};

export default VoteCoin;
