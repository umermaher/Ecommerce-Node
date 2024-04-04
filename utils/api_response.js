const apiResponse = (statusCode, message, body = {}, errors = {}, exception = {}) => {
    return {
        statusCode,
        message,
        body,
        errors,
        exception
    };
};

module.exports = apiResponse