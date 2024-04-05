const jwt = require('jsonwebtoken');

function generateToken(id) {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: 24*60*60*1000 }
    );
}

function authenticateUser(token) {
    if(!token) {
        return null;
    }
    try {
        return jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    } catch(error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    generateToken,
    authenticateUser
}