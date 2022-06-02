export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.error = true;
    err.message = message;
    return err;
};

export const responSuccess = ({message, data}) => {
    return {
        "status" : true,
        "code": 200,
        "message" : message ? message: "berhasil",
        "data" : data
    }
}
