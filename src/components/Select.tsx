import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import React, { useEffect, useRef, useState } from "react";
import { FiatModel } from "../models/fiat";
import fiatApi from "../api/fiatApi";

const CustomSelectWithSearch: React.FC = () => {
  const [state, setState] = useState<{
    searchTerm: string;
    listSearch: FiatModel[];
  }>({
    searchTerm: "",
    listSearch: [],
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedValue, setSelectedValue] = useState<string>("USD");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currencies, setCurrencies] = useState<FiatModel[]>([]);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const data = await fiatApi.getAllFiat();
        setCurrencies(data);
      } catch (error) {
        console.error("Failed to fetch fiats:", error);
      }
    };
    fetchCurrency();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setState((prevState) => ({
      ...prevState,
      searchTerm: "",
      listSearch: [],
    }));
  };

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearchTermChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: value,
      listSearch: currencies.filter((currency) =>
        currency.name.toLowerCase().includes(value.toLowerCase())
      ),
    }));
  };

  const handleClearSearchTerm = () => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: "",
      listSearch: [],
    }));
  };

  const { searchTerm, listSearch } = state;

  return (
    <div ref={containerRef} className="relative w-44 cursor-pointer">
      <div
        className="w-full px-3 py-2 hover:border-yellow-400 border-gray-600 border rounded"
        onClick={handleIsOpen}
      >
        <span>{selectedValue}</span>
        <ChevronDownIcon
          className={`size-6 absolute top-1/4 right-2 ${
            isOpen ? "transition rotate-180" : "transition"
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1E2329] rounded z-10">
          <div className="relative w-full px-1.5 py-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3.5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              className="placeholder-bold w-full pl-8 py-2 border border-gray-600 bg-inherit rounded"
            />
            {searchTerm && (
              <XCircleIcon
                className="h-5 w-5 text-gray-400 absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
                onClick={handleClearSearchTerm}
              />
            )}
          </div>

          {listSearch.length > 0 ? (
            <ul className="max-h-60 overflow-auto custom-scrollbar">
              {listSearch.map((currency) => (
                <li
                  key={currency.symbol}
                  className="px-3 py-2 hover:bg-[#2B3139] cursor-pointer font-normal"
                  onClick={() => handleSelectChange(currency.name)}
                >
                  {currency.name} - {currency.symbol}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="max-h-60 overflow-auto custom-scrollbar">
              {currencies.map((currency) => (
                <li
                  key={currency.symbol}
                  className="px-3 py-2 hover:bg-[#2B3139] cursor-pointer font-normal"
                  onClick={() => handleSelectChange(currency.name)}
                >
                  {currency.name} - {currency.symbol}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelectWithSearch;
