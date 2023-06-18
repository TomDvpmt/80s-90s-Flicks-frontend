import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateLocation } from "../../features/pageSlice";

import PropTypes from "prop-types";

const SetPageLocation = ({ page }) => {
    SetPageLocation.propTypes = {
        page: PropTypes.string.isRequired,
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateLocation(page));
    }, [page, dispatch]);

    return false;
};

export default SetPageLocation;
