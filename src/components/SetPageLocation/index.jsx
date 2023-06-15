import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { pageUpdateLocation } from "../../features/page";

import PropTypes from "prop-types";

const SetPageLocation = ({ page }) => {
    SetPageLocation.propTypes = {
        page: PropTypes.string.isRequired,
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pageUpdateLocation(page));
    }, [page, dispatch]);

    return false;
};

export default SetPageLocation;
