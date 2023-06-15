import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { filtersSetPageNumber } from "../../features/filters";

import { Box, Pagination as MUIPagination } from "@mui/material";

import PropTypes from "prop-types";

const Pagination = ({ numberOfPages, currentPage, setCurrentPage }) => {
    Pagination.propTypes = {
        numberOfPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number.isRequired,
        setCurrentPage: PropTypes.func.isRequired,
    };

    const dispatch = useDispatch();

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        dispatch(filtersSetPageNumber(currentPage));
    }, [currentPage, dispatch]);

    return (
        <Box sx={{ m: "1rem", display: "flex", justifyContent: "center" }}>
            <MUIPagination
                variant="outlined"
                shape="rounded"
                size="small"
                count={numberOfPages}
                page={currentPage}
                onChange={handlePageChange}
            />
        </Box>
    );
};

export default Pagination;
