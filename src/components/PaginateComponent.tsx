import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import {useLocation, useNavigate} from "react-router-dom";

type PaginationProps = {
    data: {
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
        currentPageTotal: number;
    };
    onPageChange?: (page: number) => void;
};
const PaginationComponent =
    ({
         data = {
             currentPage: 0,
             limit: 0,
             total: 0,
             totalPages: 0,
             currentPageTotal: 0,
         }, onPageChange
     }: PaginationProps) => {
        const {currentPage, totalPages} = data;
        const navigate = useNavigate();
        const location = useLocation();
        // if (totalPages <= 1) return null; // Hide if only one page
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
        const currentLastNumber = data.currentPage - 1;
        return (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white  py-3 ">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        // className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                        type="button"
                        className={`relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium 
                        ${currentPage === 1 ? "bg-gray-300  text-gray-600 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}
                        `}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        type="button"
                        className={`relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium 
                        ${currentPage === totalPages ? "bg-gray-300  text-gray-600 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"}
                        `}
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing {' '}
                            <span
                                className="font-medium">{currentLastNumber == 0 ? 1 : (currentLastNumber * data.limit + 1)}</span>
                            {' '} to {' '}
                            <span
                                className="font-medium">{(currentLastNumber * data.limit) + data.currentPageTotal}</span>
                            {' '} of{' '}
                            <span className="font-medium">{data.total}</span> results
                        </p>
                    </div>
                    <div>
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">

                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                // className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                                type="button"
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0
                        ${currentPage === 1 ? "bg-gray-300  text-gray-600 cursor-not-allowed" : "hover:bg-gray-50"}
                        `}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon aria-hidden="true" className="size-5"/>
                            </button>
                            {getPageNumbers().map((page, index) =>
                                page === "..." ? (
                                    <span key={index}
                                          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                            <span className={'-translate-y-0.5'}>...</span>
                                        </span>

                                ) : (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(Number(page))}
                                        className={`
                                            ${currentPage === page ?
                                            'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            : 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'}
                                                  `}

                                        // className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                type="button"
                                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0
                        ${currentPage === totalPages ? "bg-gray-300  text-gray-600 cursor-not-allowed" : "hover:bg-gray-50"}
                        `}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon aria-hidden="true" className="size-5"/>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
export default PaginationComponent;
