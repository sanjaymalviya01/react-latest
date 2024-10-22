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

  let visiblePages = [];

  if (pageCount <= 3) {
    visiblePages = pages;
  } else if (currentPage === 1) {
    visiblePages = [1, 2, 3];
  } else if (currentPage === pageCount) {
    visiblePages = [pageCount - 2, pageCount - 1, pageCount];
  } else {
    visiblePages = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <div className="pagination-outerdiv">
      <div className="text-gray-500">
        <span>Page {currentPage} </span>
        <span>of {pageCount}</span>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="page-ul">
          <li onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}>
            <a
              className={`prev-btn ${
                currentPage === 1 ? "disable-btn" : "enable-btn"
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
              <a className="page-btn">{page}</a>
            </li>
          ))}
          <li
            onClick={() =>
              currentPage < pageCount && onPageChange(currentPage + 1)
            }
          >
            <a
              className={`next-btn ${
                currentPage === pageCount ? "disable-btn" : "enable-btn"
              }`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
