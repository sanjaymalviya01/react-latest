import React from "react";
import "./pagination.css";

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

function Pagination({ items, pageSize, currentPage, onPageChange }) {
  const pageCount = Math.ceil(items / pageSize);
  if (pageCount === 1) return null;
  const pages = Array.from({ length: pageCount }, (a, i) => i + 1);

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(pageCount, currentPage + 1);
  const visiblePages = pages.slice(startPage - 1, endPage);

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li>
          <div className="pagination-info">
            <span>Showing {pageCount} Pages </span>
            <span>for {items} Products</span>
          </div>
        </li>
        <li
          className={`pageItem ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          <a
            style={{
              backgroundColor: "#ff0044",
              padding: "7px 15px",
              borderRadius: "20px",
            }}
          >
            Previous
          </a>
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
          className={`pageItem ${currentPage === pageCount ? "disabled" : ""}`}
          onClick={() =>
            currentPage < pageCount && onPageChange(currentPage + 1)
          }
        >
          <a
            style={{
              backgroundColor: "#ff0044",
              padding: "7px 15px",
              borderRadius: "20px",
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
