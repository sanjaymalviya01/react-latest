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
  return (
    <div className="p-10">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "pageItemActive" : "pageItem"}
          >
            <a className="pageLink" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
