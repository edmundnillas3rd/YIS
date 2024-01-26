import { useState } from "react";
import { usePagination, DOTS } from "../../hooks";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import classnames from "classnames";

const Pagination = (props: any) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange: any = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className="flex flex-row gap-1 text-2xl items-center"
        >
            <li
                className={classnames('pagination-item bg-black rounded-xl', {
                    disabled: currentPage === 1
                })}
                onClick={currentPage === 1 ?  null as any : onPrevious}
            >
                <FaArrowCircleLeft />
            </li>
            {paginationRange.map((pageNumber: any) => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item bg-black rounded-xl', {
                    disabled: currentPage === lastPage
                })}
                onClick={currentPage === lastPage ?  null as any : onNext}
            >
                <FaArrowCircleRight />
            </li>
        </ul>
    );
};

export default Pagination;