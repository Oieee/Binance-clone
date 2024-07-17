import { ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { Fragment, useState } from "react";
import coinApi from "../api/coinApi";
import { formatPrice, formatPriceV2 } from "../utils";
import CustomSelectWithSearch from "../components/Select";
import ChartComponent from "../components/Chart";
import VoteCoin from "../components/VoteCoin";
import { useQueryString } from "../utils/utils";
import { useQuery } from "@tanstack/react-query";

const MAX_LENGTH = 10;
const IS_STRING = /^\d*$/;

const Price: React.FC = () => {
  const queryString: { coinId?: string } = useQueryString();

  const { data, isLoading } = useQuery({
    queryKey: ["getCoinDetail", queryString.coinId],
    queryFn: () => coinApi.getCoinDetails(queryString.coinId || ""),
  });

  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("0.00");
  const [tab, setTab] = useState<boolean>(true);

  const handleChangeQuantity = (value: string) => {
    if (IS_STRING.test(value)) {
      setQuantity(value);
      setPrice(formatPrice(Number(value) * (data?.price || 0)));
    }
    return;
  };

  const handleTabChange = () => {
    setTab((prev) => !prev);
  };

  // const [coin, setCoin] = useState<{
  //   data: Coin | null;
  //   isLoading: boolean;
  //   error: string | null;
  // }>({ data: null, isLoading: false, error: null });
  // useEffect(() => {
  //   const fetchCoins = async () => {
  //     try {
  //       const data = await coinApi.getCoinDetails(coinId);
  //       setCoin((prevCoin) => ({
  //         data: data || null,
  //         isLoading: false,
  //         error: prevCoin ? null : "No data",
  //       }));
  //     } catch (error) {
  //       console.error("Failed to fetch coins:", error);
  //     }
  //   };

  //   fetchCoins();
  // }, [coinId]);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Fragment>
          <section className="text-gray-400 space-x-2">
            <span>Home</span>
            <ChevronRightIcon className="size-4 inline-block" />
            <span>Price</span>
            <ChevronRightIcon className="size-4 inline-block" />
            <span className="text-white">{data.name} Price</span>
          </section>

          <main className="flex space-x-20">
            <div className="w-8/12">
              <section className="flex mt-8 justify-between">
                <figure className="flex items-center">
                  <img src={data.icon} alt="icon_coin" className="size-12" />
                  <figcaption className="text-white text-3xl ml-2">
                    <h1 className="text-4xl inline-block">{data.name} Price</h1>
                    <span className="text-lg text-gray-400">
                      ({data.symbol})
                    </span>
                  </figcaption>
                </figure>

                <span className="flex items-center justify-between">
                  <span className="mr-6">Currency</span>
                  <CustomSelectWithSearch />
                </span>
              </section>

              <section className="mt-4">
                <span className="text-2xl">
                  {formatPriceV2(data.price || 0)}
                </span>
                <span className="text-xl text-green-600 mx-3">
                  +{data.priceChange1d} %
                </span>
                <span className="text-gray-600 text-sm">1d</span>
              </section>

              <ChartComponent />

              <VoteCoin />
            </div>

            <aside className="w-4/12 mt-20">
              <section className="flex text-2xl">
                <span
                  className={`cursor-pointer ${
                    tab && "border-b-4 border-yellow-400 pb-2"
                  }`}
                  onClick={() => handleTabChange()}
                >
                  Buy BNB
                </span>
                <span
                  className={`ml-6 cursor-pointer ${
                    !tab && "border-b-4 border-yellow-400 pb-2"
                  }`}
                  onClick={() => handleTabChange()}
                >
                  Trade BNB
                </span>
              </section>

              {tab === true ? (
                <section className="mt-4 max-w-sm">
                  <div className="bg-[#2B3139] rounded-lg py-5 px-5">
                    <span>Buy</span>
                    <div className="flex justify-between">
                      <input
                        type="text"
                        placeholder="0.00"
                        className="bg-inherit text-xl border-none focus:outline-none focus:overscroll-none"
                        onChange={(e) => handleChangeQuantity(e.target.value)}
                        value={quantity}
                        maxLength={MAX_LENGTH}
                      />
                      <figure className="rounded-3xl bg-black py-2 px-3 flex items-center">
                        <img
                          src={data.icon}
                          alt="icon"
                          className="size-6 mr-2"
                        />
                        <figcaption>{data.symbol}</figcaption>
                      </figure>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4 text-xl text-gray-400">
                    <span>
                      {quantity ? quantity : ""} {data.name} ={" "}
                    </span>
                    <span className="truncate max-w-40">USD {price}</span>
                  </div>

                  <button className="bg-yellow-400 text-black w-full py-3 mt-4 rounded-md">
                    Buy {data.symbol}
                  </button>
                  <span className="text-xs text-gray-500 float-right mt-2">
                    Last updated 2024/07/14 02:38 (UTC)
                  </span>
                </section>
              ) : (
                <section className="space-y-4 mt-4 max-w-sm">
                  <div className="flex justify-between bg-[#2B3139] px-4 py-4 hover:bg-slate-500 cursor-pointer">
                    <div>
                      <span>BNB</span>
                      <span className="text-gray-600">/USDT</span>
                    </div>
                    <div>
                      <span>$ 561.70</span>
                      <span className="text-green-600 ml-2">+3.96%</span>
                    </div>
                  </div>
                  <div className="flex justify-between bg-[#2B3139] px-4 py-4">
                    <div>
                      <span>BNB</span>
                      <span className="text-gray-600">/USDT</span>
                    </div>
                    <div>
                      <span>$ 561.70</span>
                      <span className="text-green-600 ml-2">+3.96%</span>
                    </div>
                  </div>
                  <div className="flex justify-between bg-[#2B3139] px-4 py-4">
                    <div>
                      <span>BNB</span>
                      <span className="text-gray-600">/USDT</span>
                    </div>
                    <div>
                      <span>$ 561.70</span>
                      <span className="text-green-600 ml-2">+3.96%</span>
                    </div>
                  </div>
                </section>
              )}
            </aside>
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default Price;
