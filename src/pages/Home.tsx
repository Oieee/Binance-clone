import React, { useEffect, useState } from "react";
import BoxInfor from "../components/BoxInfor";
import coinApi from "../api/coinApi";
import { Coin } from "../models/coin";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentMagnifyingGlassIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { formatBillion, formatPriceV2, sortData } from "../utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PaginationV2 from "../components/PaginationV2";
import { useQueryString } from "../utils/utils";

const listLink1 = [
  {
    name: "Favorites",
    url: "#",
  },
  {
    name: "All Crytos",
    url: "#",
  },
  {
    name: "Spot/Margin Market",
    url: "#",
  },
  {
    name: "Futures Markets",
    url: "#",
  },
  {
    name: "New Listing",
    url: "#",
  },
  {
    name: "Zones",
    url: "#",
  },
];

const listLink2 = [
  { name: "All" },
  { name: "Solana" },
  { name: "RWA" },
  { name: "Meme" },
  { name: "Payment" },
  { name: "AI" },
  { name: "Layer 1 / Layer 2" },
  { name: "Metaverse" },
];

const listOptionVolume = [
  {
    name: "1h",
    value: "1h",
  },
  {
    name: "1d",
    value: "1d",
  },
  {
    name: "1w",
    value: "1w",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllCoins", page],
    queryFn: () => coinApi.getAllCoins(page),
    placeholderData: keepPreviousData,
  });

  const [totalPage, setTotalPage] = useState<number>(0);

  const [search, setSearch] = useState<{
    hover: boolean;
    focus: boolean;
  }>({
    hover: false,
    focus: false,
  });

  const [sortBy, setSortBy] = useState<string>("default");
  const [sortedData, setSortedData] = useState<Coin[]>([]);
  const [periodTime, setPeriodTime] = useState<string>("1h");

  useEffect(() => {
    if (data?.result) {
      setSortedData(data.result);
      setTotalPage(data.meta.pageCount);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const topCoins = data.result
    .sort((a: { rank: number }, b: { rank: number }) => a.rank - b.rank)
    .slice(0, 3);
  const bottomCoins = data.result
    .sort((a: { rank: number }, b: { rank: number }) => a.rank - b.rank)
    .slice(-3);
  const galnerCoins = data.result
    .sort(
      (a: { priceChange1w: number }, b: { priceChange1w: number }) =>
        b.priceChange1w - a.priceChange1w
    )
    .slice(0, 3);
  const volumeCoins = data.result
    .sort((a: { volume: number }, b: { volume: number }) => b.volume - a.volume)
    .slice(0, 3);

  const handleItemClick = (coinId: string) => {
    navigate("/price?coinId=" + coinId);
  };

  const handleChangeSort = (type: string) => {
    if (type === sortBy) {
      setSortBy(`-${type}`);
      setSortedData([...sortedData].reverse());
      return;
    }
    if (sortBy === `-${type}`) {
      setSortBy("default");
      setSortedData(data.result);
      return;
    }
    setSortBy(type);
    setSortedData(sortData(data.result, type));
  };

  const handleChangePeriodTime = (type: string) => {
    setPeriodTime(type);
  };

  return (
    <main>
      <h1 className="text-4xl font-bold mb-12">Markets Overview</h1>
      <section className="grid grid-cols-4 gap-x-4">
        <BoxInfor title="Hot Coins" data={topCoins} />
        <BoxInfor title="New Listing" data={bottomCoins} />
        <BoxInfor title="Top Galner Coin" data={galnerCoins} />
        <BoxInfor title="Top Volume Coin" data={volumeCoins} />
      </section>

      <section className="flex items-center justify-between">
        <ul className="flex my-4 w-fit space-x-6">
          {listLink1.map((link, index) => (
            <li
              className="font-semibold text-lg text-gray-400 cursor-pointer hover:text-white duration-300"
              key={index}
            >
              {link.name}
            </li>
          ))}
        </ul>

        <section
          className="flex overflow-hidden"
          onMouseEnter={() => setSearch({ ...search, hover: true })}
          onMouseLeave={() =>
            !search.focus && setSearch({ ...search, hover: false })
          }
        >
          {search.hover ? (
            <div className="relative">
              <input
                className="w-80 h-10 border rounded-xl bg-inherit pl-9 focus:border-yellow-500 focus:outline-none 
                duration-300"
                type="text"
                name=""
                id="searchCoin"
                placeholder="Search Coin Name or Symbol"
                onFocus={() => setSearch({ ...search, focus: true })}
                onBlur={() =>
                  setSearch({ ...search, focus: false, hover: false })
                }
              />
              <MagnifyingGlassIcon className="size-6 text-gray-700 absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
          ) : (
            <MagnifyingGlassIcon className="size-6 text-gray-700" />
          )}
        </section>
      </section>

      <section>
        <ul className="flex justify-between items-center w-fit space-x-4">
          {listLink2.map((link, index) => (
            <li
              className="font-semibold text-base text-gray-400 cursor-pointer px-2.5 py-0.5 hover:text-white hover:bg-gray-800 rounded-md duration-300"
              key={index}
            >
              {link.name}
            </li>
          ))}
        </ul>

        <table className="w-full mt-4">
          <thead className="text-sm font-mono text-gray-400">
            <tr>
              <th>
                <div
                  className="cursor-pointer flex w-fit"
                  onClick={() => handleChangeSort("name")}
                >
                  <span>Name</span>
                  <div className="ml-1">
                    <ChevronUpIcon
                      className={`size-2.5 ${
                        sortBy === "name" && "text-yellow-400"
                      }`}
                    />
                    <ChevronDownIcon
                      className={`size-2.5 ${
                        sortBy === "-name" && "text-yellow-400"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th>
                <div
                  className="cursor-pointer flex w-fit float-right"
                  onClick={() => handleChangeSort("price")}
                >
                  <span>Price</span>
                  <div className="ml-1">
                    <ChevronUpIcon
                      className={`size-2.5 ${
                        sortBy === "price" && "text-yellow-400"
                      }`}
                    />
                    <ChevronDownIcon
                      className={`size-2.5 ${
                        sortBy === "-price" && "text-yellow-400"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th>
                <div className="flex items-center justify-end">
                  <select
                    className="bg-inherit border border-gray-400 rounded-[4px] pl-1.5 py-0.5 mr-2 hover:border-yellow-400"
                    onChange={(e) => handleChangePeriodTime(e.target.value)}
                  >
                    {listOptionVolume.map((option, index) => (
                      <option
                        className="bg-[#1E2329]"
                        value={option.value}
                        key={index}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <div
                    className="cursor-pointer flex w-fit float-right"
                    onClick={() => handleChangeSort("change")}
                  >
                    <span>Change</span>
                    <div className="ml-1">
                      <ChevronUpIcon
                        className={`size-2.5 ${
                          sortBy === "change" && "text-yellow-400"
                        }`}
                      />
                      <ChevronDownIcon
                        className={`size-2.5 ${
                          sortBy === "-change" && "text-yellow-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </th>

              <th>
                <div
                  className="cursor-pointer flex w-fit float-right"
                  onClick={() => handleChangeSort("1dvolume")}
                >
                  <span>24h Volume</span>
                  <div className="ml-1">
                    <ChevronUpIcon
                      className={`size-2.5 ${
                        sortBy === "1dvolume" && "text-yellow-400"
                      }`}
                    />
                    <ChevronDownIcon
                      className={`size-2.5 ${
                        sortBy === "-1dvolume" && "text-yellow-400"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th>
                <div
                  className="cursor-pointer flex w-fit float-right"
                  onClick={() => handleChangeSort("marketCap")}
                >
                  <span>Market Cap</span>
                  <div className="ml-1">
                    <ChevronUpIcon
                      className={`size-2.5 ${
                        sortBy === "marketCap" && "text-yellow-400"
                      }`}
                    />
                    <ChevronDownIcon
                      className={`size-2.5 ${
                        sortBy === "-marketCap" && "text-yellow-400"
                      }`}
                    />
                  </div>
                </div>
              </th>

              <th>
                <span className="float-right">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {sortedData.map((coin: Coin) => (
              <tr
                key={coin.id}
                className="h-16 text-right cursor-pointer hover:bg-gray-800"
                onClick={() => handleItemClick(coin.id)}
              >
                <td className="">
                  <figure className="flex items-center">
                    <img src={coin.icon} alt="icon_coin" className="w-6 h-6" />
                    <figcaption className="ml-2 font-semibold">
                      {coin.symbol}
                      <span className="ml-2 text-gray-400 text-sm">
                        {coin.name}
                      </span>
                    </figcaption>
                  </figure>
                </td>

                <td>{formatPriceV2(coin.price)}</td>

                <td
                  className={`${
                    coin.priceChange1h < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {periodTime === "1h"
                    ? coin.priceChange1h
                    : (periodTime === "1d" && coin.priceChange1d) ||
                      (periodTime === "1w" && coin.priceChange1w)}
                  %
                </td>

                <td>{formatBillion(coin.volume)}</td>

                <td>{formatBillion(coin.marketCap)}</td>

                <td>
                  <section className="flex justify-end space-x-3">
                    <div className="tooltip relative">
                      <DocumentMagnifyingGlassIcon className="size-6 hover:text-yellow-400 cursor-pointer" />
                      <div
                        className="tooltiptext invisible bg-gray-300 text-black text-xs 
                      rounded py-2 px-3 absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2"
                      >
                        Detail
                        <div className="tooltip-arrow absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
                      </div>
                    </div>

                    <div className="tooltip relative">
                      <AdjustmentsHorizontalIcon className="size-6 hover:text-yellow-400 cursor-pointer" />
                      <div
                        className="tooltiptext invisible bg-gray-300 text-black text-xs 
                      rounded py-2 px-3 absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2"
                      >
                        Trade
                        <div className="tooltip-arrow absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
                      </div>
                    </div>
                  </section>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <PaginationV2 totalPage={totalPage} currentPage={page} />
      </section>
    </main>
  );
};

export default Home;
