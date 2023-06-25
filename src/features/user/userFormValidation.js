import {
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from "../../config/form";

/**
 * Email regex :
 * ------------
 *   - starts with at least 1 alphanumeric character, underscore, dash or dot
 *   - then @
 *   - then at least 1 group of alphanumeric characters, underscores or dashes, ending with a dot
 *   - ends with 2 to 4 alphanumeric characters
 *   - no accents
 */
const emailRegex = new RegExp(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/);

const inputHasErrors = (type, input) => {
    let errorConditions = [];
    switch (type) {
        case "username":
            errorConditions = [
                input.length < USERNAME_MIN_LENGTH,
                input.length > USERNAME_MAX_LENGTH,
            ];
            break;
        case "password":
            errorConditions = [
                input.length < PASSWORD_MIN_LENGTH,
                input.length > PASSWORD_MAX_LENGTH,
            ];
            break;
        case "email":
            errorConditions = [!emailRegex.test(input)];
            break;
        default:
            errorConditions = [];
    }

    return errorConditions.reduce((acc, value) => acc || value, false);
};

export const formHasErrors = (inputs) => {
    return inputs.reduce(
        (acc, input) => acc || inputHasErrors(input.type, input.state),
        false
    );
};

export const showFormErrors = (inputs, localDispatch) => {
    inputs.forEach((input) => {
        if (inputHasErrors(input.type, input.state)) {
            localDispatch({
                type: input.showErrorsActionType,
                payload: true,
            });
        }
    });
};
