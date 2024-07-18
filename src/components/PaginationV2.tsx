import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link } from "react-router-dom";

interface PaginationV2Props {
  totalPage: number;
  currentPage: number;
}
const PaginationV2: React.FC<PaginationV2Props> = ({
  totalPage,
  currentPage,
}) => {
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
        page.push(createDots());
      }

      const start = Math.max(4, currentPage - 1);
      const end = Math.min(totalPage - 3, currentPage + 1);
      for (let i = start; i <= end; i++) {
        page.push(i);
      }

      if (rightEllipsis && currentPage !== totalPage - 4) {
        page.push(createDots());
      }
      page.push(totalPage - 2, totalPage - 1, totalPage);
    }

    return page;
  };

  const createDots = () => {
    return <span>...</span>;
  };

  const pages = generatePages();

  const onPageChange = (page: number | object) => {
    if (typeof page === "number") {
      window.location.href = `?page=${page}`;
    } else {
      return;
    }
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
      {pages.map((page, index) => (
        <li
          key={index}
          className={`cursor-pointer w-7 h-7 flex items-center justify-center rounded-md
            ${
              currentPage === page
                ? "text-white bg-[#474D57] hover:bg-[#474D57]"
                : "text-gray-500"
            }
            ${
              typeof page == "object"
                ? "text-gray-500 hover:cursor-not-allowed"
                : ""
            }
            `}
          onClick={() => onPageChange(page)}
        >
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
