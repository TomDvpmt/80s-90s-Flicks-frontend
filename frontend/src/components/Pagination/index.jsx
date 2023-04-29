import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { filtersSetPageNumber } from "../../features/filters";

// import { Stack, Pagination as MUIPagination } from "@mui/material";

import styled from "styled-components";

import PropTypes from "prop-types";

const StyledPagination = styled.div`
    margin: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;

    .page-numbers {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        input {
            padding: 0.2rem 0.5rem;
        }
    }
`;

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
    Pagination.propTypes = {
        numberOfPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        setCurrentPage: PropTypes.func.isRequired,
    };

    const dispatch = useDispatch();

    const goToPreviousPage = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage) => currentPage - 1);
    };

    const goToNextPage = (e) => {
        e.preventDefault();
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handleDirectPageClick = (e) => {
        e.target.value && setCurrentPage(parseInt(e.target.value));
    };

    useEffect(() => {
        dispatch(filtersSetPageNumber(currentPage));
    }, [currentPage, dispatch]);

    return (
        <StyledPagination className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Page préc.
            </button>
            <div className="page-numbers" onClick={handleDirectPageClick}>
                {currentPage !== 1 && <input type="button" value="1" />}
                {currentPage > 4 && <span> ... </span>}
                {currentPage > 3 && (
                    <input type="button" value={currentPage - 2} />
                )}
                {currentPage > 2 && (
                    <input type="button" value={currentPage - 1} />
                )}
                <strong>{currentPage}</strong>
                {currentPage < numberOfPages - 1 && (
                    <input type="button" value={currentPage + 1} />
                )}
                {currentPage < numberOfPages - 2 && (
                    <input type="button" value={currentPage + 2} />
                )}
                {currentPage < numberOfPages - 3 && <span> ... </span>}
                {currentPage !== numberOfPages && (
                    <input type="button" value={numberOfPages} />
                )}
            </div>
            <button
                onClick={goToNextPage}
                disabled={currentPage === numberOfPages}>
                Page suiv.
            </button>
        </StyledPagination>
    );
};

export default Pagination;
