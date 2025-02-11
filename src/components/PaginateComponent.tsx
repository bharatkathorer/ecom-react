import {useLocation, useNavigate} from "react-router-dom";

type PaginationProps = {
    data: {
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    onPageChange?: (page: number) => void;
};

const PaginationComponent = ({
                                 data = {
                                     currentPage: 0,
                                     limit: 0,
                                     total: 0,
                                     totalPages: 0,
                                 }, onPageChange
                             }: PaginationProps) => {
    const {currentPage, totalPages} = data;
    const navigate = useNavigate();
    const location = useLocation();
    if (totalPages <= 1) return null; // Hide if only one page

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 2; // Number of pages to show on left & right of current page

        // Always show first two pages
        if (currentPage > maxVisiblePages + 2) {
            pages.push(1, 2, "...");
        } else {
            for (let i = 1; i <= Math.min(3, totalPages); i++) {
                pages.push(i);
            }
        }

        // Middle pages
        for (let i = Math.max(3, currentPage - maxVisiblePages); i <= Math.min(totalPages - 2, currentPage + maxVisiblePages); i++) {
            if (!pages.includes(i)) {
                pages.push(i);
            }
        }

        // Last two pages
        if (currentPage < totalPages - (maxVisiblePages + 1)) {
            pages.push("...", totalPages - 1, totalPages);
        } else {
            for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
        }

        return pages;
    };
    const handlePageChange = (page: any) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", page);
        navigate(`?${searchParams.toString()}`, {replace: true});
        onPageChange && onPageChange(page);
    }
    return (
        <div className="flex items-center space-x-2 mt-4">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
                Prev
            </button>

            {/* Page Numbers with Ellipsis */}
            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={index} className="px-2 text-gray-600">
                        ...
                    </span>
                ) : (
                    <button
                        key={index}
                        onClick={() => handlePageChange(Number(page))}
                        className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationComponent;
