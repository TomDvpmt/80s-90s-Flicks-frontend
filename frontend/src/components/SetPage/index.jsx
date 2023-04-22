import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { pageUpdateLocation } from "../../services/features/page";

import PropTypes from "prop-types";

const SetPage = ({ page }) => {
    SetPage.propTypes = {
        page: PropTypes.string.isRequired,
    };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pageUpdateLocation(page));
    }, [page]);

    return false;
};

export default SetPage;
