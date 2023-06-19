export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

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

export const showFormErrors = (inputs) => {
    inputs.forEach((input) => {
        if (inputHasErrors(input.type, input.state)) {
            input.showErrors(true);
        }
    });
};
