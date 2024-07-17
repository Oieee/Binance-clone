import React from "react";
import { Coin } from "../models/coin";
import { formatPrice } from "../utils";

interface BoxInforProps {
  title: string;
  data: Coin[];
}

const BoxInfor: React.FC<BoxInforProps> = ({ title, data }) => {
  return (
    <article className="border border-gray-800 rounded-lg h-fit space-y-4 px-3 py-3">
      <h1>{title}</h1>
      {data.map((coin, index) => (
        <section key={index} className="flex justify-between">
          <figure className="flex w-4/12">
            <img src={coin.icon} alt="icon_coin" className="w-6 h-6" />
            <figcaption className="ml-2 font-semibold">
              {coin.symbol}
            </figcaption>
          </figure>
          <span className="xl:block hidden w-3/12 pl-6">
            {formatPrice(coin.price)}
          </span>
          <span
            className={`text-${
              coin.priceChange1h < 0 ? "red-600" : "green-600"
            } w-4/12 text-right`}
          >
            {coin.priceChange1h}%
          </span>
        </section>
      ))}
    </article>
  );
};

export default BoxInfor;
