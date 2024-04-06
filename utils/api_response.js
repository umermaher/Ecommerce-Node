const response = (statusCode, message, body = {}, errors = {}, exception = {}) => {
    return {
        statusCode,
        message,
        body,
        errors,
        exception
    };
};

function apiResponse(res, statusCode, message, body = {}, errors = {}, exception = {}) {
    return res.status(statusCode).json(
        response(statusCode, message, body, errors, exception)
    );
}

module.exports = apiResponse;