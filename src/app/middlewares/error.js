export const errorHandler = (res, statusCode = 500, message = "Internal Server Error") => {
    return res.status(statusCode).json({
        success: false,
        message: message
    })
}

export const asyncError = (myFun) => async (req, res) => {
    try {
        await myFun(req, res);
    } catch (e) {
        console.error("Async error caught:", e);
        errorHandler(res, 500, e);
    }
};
