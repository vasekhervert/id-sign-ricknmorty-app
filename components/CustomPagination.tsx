import Link from "next/link";

type CustomPaginationProps = {
  currentPage: number;
  pages: number;
};

export const CustomPagination = ({
  currentPage,
  pages,
}: CustomPaginationProps) => {
  const renderPaginationItems = () => {
    const pagesArray = Array.from({ length: pages }, (_, i) => i + 1); // make an array of props.pages length
    const items = pagesArray.map((i: number) => (
      <li className="page-item" key={i}>
        <Link
          href={i === 1 ? "/" : `/episodes/${i}`}
          className={`page-link ${i === currentPage && "active"}`}
        >
          {i}
        </Link>
      </li>
    ));

    return items;
  };

  return (
    <ul className="pagination justify-content-center my-4">
      {renderPaginationItems()}
    </ul>
  );
};
