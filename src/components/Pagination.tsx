import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  onPageChange,
}) => {
  //   const pages = Array.from({ length: totalPage }).map((_, index) => index + 1);
  const generatePages = () => {
    const pages = [];

    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      const leftEllipsis = currentPage > 4;
      const rightEllipsis = currentPage < totalPage - 3;

      pages.push(1, 2, 3);
      if (leftEllipsis) {
        pages.push("...");
      }
      const start = Math.max(4, currentPage - 1);
      const end = Math.min(totalPage - 3, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (rightEllipsis && currentPage !== totalPage - 4) {
        pages.push("...");
      }
      pages.push(totalPage - 2, totalPage - 1, totalPage);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div>
      <ul className="flex space-x-2 items-center justify-end mt-4">
        <li>
          <ChevronLeftIcon
            className={`size-6 cursor-pointer ${
              currentPage === 1 && "text-gray-400"
            }`}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </li>

        {pages.map((page) => (
          <li
            key={page}
            className={`px-2 py-1 rounded-lg ${
              page !== "..." && "cursor-pointer"
            } ${currentPage === page ? "bg-gray-800" : ""}`}
            onClick={
              page === "..." ? () => {} : () => onPageChange(Number(page))
            }
          >
            {page}
          </li>
        ))}
        <li>
          <ChevronRightIcon
            className={`size-6 cursor-pointer ${
              totalPage === currentPage && "text-gray-400"
            }`}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
