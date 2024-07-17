import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link } from "react-router-dom";

interface PaginationV2Props {
  totalPage: number;
  currentPage: number;
  //   onPageChange: (page: number) => void;
}
const PaginationV2: React.FC<PaginationV2Props> = ({
  totalPage,
  currentPage,
  //   onPageChange,
}) => {
  //   const pages = Array.from({ length: totalPage }).map((_, index) => index + 1);

  const generatePages = () => {
    const page = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        page.push(i);
      }
    } else {
      const leftEllipsis = currentPage > 4;
      const rightEllipsis = currentPage < totalPage - 3;

      page.push(1, 2, 3);

      if (leftEllipsis) {
        page.push("...");
      }

      const start = Math.max(4, currentPage - 1);
      const end = Math.min(totalPage - 3, currentPage + 1);
      for (let i = start; i <= end; i++) {
        page.push(i);
      }
      if (rightEllipsis && currentPage !== totalPage - 4) {
        page.push("...");
      }
      page.push(totalPage - 2, totalPage - 1, totalPage);
    }
    return page;
  };

  const pages = generatePages();

  const onPageChange = (page: number) => {
    window.location.href = `?page=${page}`;
  };

  return (
    <ul className="flex space-x-2 items-center justify-end text-sm">
      <li>
        {currentPage > 1 ? (
          <Link to={`?page=${currentPage - 1}`}>
            <ChevronLeftIcon className="size-7 cursor-pointer rounded-md text-white hover:bg-[#474D57]" />
          </Link>
        ) : (
          <ChevronLeftIcon className="size-7 cursor-not-allowed rounded-md text-gray-700" />
        )}
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={`cursor-pointer w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#474D57] ${
            currentPage === page ? "text-white bg-[#474D57]" : "text-gray-500"
          }`}
          onClick={() => onPageChange(Number(page))}
        >
          {/* <Link to={`?page=${page}`}>{page}</Link> */}
          <span>{page}</span>
        </li>
      ))}
      <li>
        {currentPage < totalPage ? (
          <Link to={`?page=${currentPage + 1}`}>
            <ChevronRightIcon className="size-7 cursor-pointer rounded-md text-white hover:bg-[#474D57]" />
          </Link>
        ) : (
          <ChevronRightIcon className="size-7 cursor-not-allowed rounded-md text-gray-700" />
        )}
      </li>
    </ul>
  );
};

export default PaginationV2;
