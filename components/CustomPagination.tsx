import Link from "next/link";
import Pagination from "react-bootstrap/Pagination";

export default function CustomPagination(props: {
  currentPage: number;
  pages: number;
}) {
  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= props.pages; number++) {
      items.push(
        <li className="page-item">
          <Link
            href={number === 1 ? "/" : `/episodes/${number}`}
            className={`page-link ${number === props.currentPage && "active"}`}
          >
            {number}
          </Link>
        </li>
      );
    }

    return items;
  };

  return (
    <ul className="pagination justify-content-center my-4">
      {renderPaginationItems()}
    </ul>
  );
}
