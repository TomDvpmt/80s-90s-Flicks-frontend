import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setPageLocation } from "../../navigationSlice";

import PropTypes from "prop-types";

const SetPageLocation = ({ page }) => {
    SetPageLocation.propTypes = {
        page: PropTypes.string.isRequired,
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageLocation(page));
    }, [page, dispatch]);

    return false;
};

export default SetPageLocation;
