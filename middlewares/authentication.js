const { authenticateUser } = require('../services/auth.js');
const StatusCode  = require('../utils/status_code.js');
const apiResponse = require('../utils/api_response.js');

const authenitcation = (req, res, next) => {
    const user = authenticateUser(req.headers.authorization);
    if (!user) {
        return res.status(StatusCode.UNAUTHORIZED).json(
            apiResponse(StatusCode.UNAUTHORIZED, 'Unauthenticated user!')
        );
    }
    req.userId = user.id;
    next();
};

module.exports = authenitcation;