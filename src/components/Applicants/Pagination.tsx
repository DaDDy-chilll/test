type PaginationProps = {
  totalPages: any;
  // itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  totalPages,
  // itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  // Calculate total pages

  // Change page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-secondaryColor rounded-md w-10 h-10 flex items-center justify-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Dynamically create page numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
          <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={
            currentPage === index + 1
              ? "active bg-secondaryColor rounded-md w-10 h-10 flex items-center justify-center text-white"
              : "bg-secondaryColor rounded-md w-10 h-10 flex items-center justify-center text-white"
          }
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-secondaryColor rounded-md w-10 h-10 flex items-center justify-center text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
