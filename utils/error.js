export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.error = true;
    err.message = message;
    return err;
};
