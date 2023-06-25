import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setPageNumber } from "../../features/movie/movieSlice";

import { Box, Pagination as MUIPagination } from "@mui/material";

import PropTypes from "prop-types";

const Pagination = ({ reducer }) => {
    Pagination.propTypes = {
        reducer: PropTypes.object.isRequired,
    };

    const dispatch = useDispatch();

    const handlePageChange = (event, value) => {
        reducer.localDispatch({
            type: reducer.ACTIONS.setCurrentPage,
            payload: value,
        });
    };

    useEffect(() => {
        dispatch(setPageNumber(reducer.state.currentPage));
    }, [reducer.state.currentPage, dispatch]);

    return (
        <Box sx={{ m: "1rem", display: "flex", justifyContent: "center" }}>
            <MUIPagination
                variant="outlined"
                shape="rounded"
                size="small"
                count={reducer.state.numberOfPages}
                page={reducer.state.currentPage}
                onChange={handlePageChange}
            />
        </Box>
    );
};

export default Pagination;
