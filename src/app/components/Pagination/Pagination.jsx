"use client";
import "./pagination.css";

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

function Pagination({ items, pageSize, currentPage, onPageChange }) {
  const pageCount = Math.ceil(items / pageSize);

  if (pageCount === 1 || pageCount === 0) return null;
  const pages = Array.from({ length: pageCount }, (a, i) => i + 1);

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(pageCount, currentPage + 1);
  const visiblePages = pages.slice(startPage - 1, endPage);

  return (
    <>
      <div className="p-4 flex items-center justify-around select-none">
        <div className="text-gray-500">
          <span>Page {currentPage} </span>
          <span>of {pageCount}</span>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-base h-10">
            <li
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
              <a
                className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === 1
                    ? "bg-white text-gray-500"
                    : "bg-primary text-white"
                }`}
              >
                Previous
              </a>
            </li>
            {visiblePages.map((page) => (
              <li
                key={page}
                className={
                  page === currentPage ? "text-primary" : "text-gray-500"
                }
                onClick={() => onPageChange(page)}
              >
                <a className="flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  {page}
                </a>
              </li>
            ))}
            <li
              onClick={() =>
                currentPage < pageCount && onPageChange(currentPage + 1)
              }
            >
              <a
                className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === pageCount
                    ? "bg-white text-gray-500"
                    : "bg-primary text-white"
                }`}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* <div className="pagination-container">
        <ul className="pagination">
          <li>
            <div className="pagination-info">
              <span>Showing {pageCount} Pages </span>
              <span>for {items} Products</span>
            </div>
          </li>
          <li
            className={`pageItem ${
              currentPage === 1 ? "disabled buttonDisable" : "buttonEnable"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          >
            <a>Previous</a>
          </li>
          {visiblePages.map((page) => (
            <li
              key={page}
              className={page === currentPage ? "pageItemActive" : "pageItem"}
              onClick={() => onPageChange(page)}
            >
              <a className="pageLink">{page}</a>
            </li>
          ))}
          <li
            className={`pageItem ${
              currentPage === pageCount
                ? "disabled buttonDisable"
                : "buttonEnable"
            }`}
            onClick={() =>
              currentPage < pageCount && onPageChange(currentPage + 1)
            }
          >
            <a>Next</a>
          </li>
        </ul>
      </div> */}
    </>
  );
}

export default Pagination;
