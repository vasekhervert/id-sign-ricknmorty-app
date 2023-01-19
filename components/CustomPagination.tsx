import Pagination from "react-bootstrap/Pagination";

export default function CustomPagination(props: {
  currentPage: number;
  pages: number;
}) {
  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= props.pages; number++) {
      items.push(
        <Pagination.Item
          active={number === props.currentPage}
          href={number === 1 ? "/" : `/episodes/${number}`}
          key={number}
        >
          {number}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Pagination className="justify-content-center">
      {renderPaginationItems()}
    </Pagination>
  );
}
