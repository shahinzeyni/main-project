import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Pagination.css";

export default function Pagination({
  items,
  itemsCount,
  pathName,
  setShowCoursePagination
}) {
  const { page } = useParams();
  const [pageCount,setPageCount] = useState(null)

  useEffect(() => {
    let endIndex = itemsCount * page;
    let startIndex = endIndex - itemsCount;
    let paginatedItems = items.slice(startIndex, endIndex);
    setShowCoursePagination(paginatedItems);

    let pageNumber = Math.ceil(items.length / itemsCount);
    setPageCount(pageNumber);
  }, [page,items]);

  return (
    <div className="courses-pagination">
      <ul className="courses__pagination-list">
        {Array(pageCount)
          .fill(0)
          .map((item, index) => (
            <>
              <li className="courses__pagination-item">
                <Link to={`${pathName}/${index+1}`}
                className={`courses__pagination-link  ${index+1 === Number(page) ? "courses__pagination-link--active" :""}`}
                >
                  {index + 1}
                </Link>
              </li>
            </>
          ))}
      </ul>
    </div>
  );
}
