type PaginationProps = {
  totalPages: any;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  /**
   * This function is used to go to next or previous page or to the specific page.
   * @author PSK
   * @param {number} page Page number
   */
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 mt-3">
      <button
        title="前へ"
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
          title={`${index + 1}ページ`}
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
        title="次へ"
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
