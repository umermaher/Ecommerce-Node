const User = require('../model/user.model.js');
const apiResponse = require('../utils/api_response.js');
const StatusCode  = require('../utils/status_code.js');

const signUp = async (req, res) => {
    
    try {
        const { email } = req.body;
        if(await isUserExists(email)) {
            return res.status(StatusCode.UNPROCESSABLE_ENTITY).json(
                apiResponse(
                    StatusCode.UNPROCESSABLE_ENTITY,
                    'User with this email already exists!'
                )
            )
        }

        const user = await User.create(req.body);
        
        const responseUser = user.toJSON();
        delete responseUser.password; // Remove the password field to send object to client
        
        const response = apiResponse(
            StatusCode.OK, 'User created successfully!', responseUser
        );
        res.status(StatusCode.OK).json(response);
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
            apiResponse(
                StatusCode.INTERNAL_SERVER_ERROR, error.message
            )
        );
    }

}

const signIn = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne( {
            email, password
        } );

        if(!user) {
            return res.status(StatusCode.CONFLICTED).json(
                apiResponse(
                    StatusCode.CONFLICTED,
                    'Invalid email or password!'
                )
            );
        }
        
        const responseUser = user.toJSON();
        delete responseUser.password; // Remove the password field to send object to client
        
        const response = apiResponse(
            StatusCode.OK, 'User Logged in successfully!', responseUser
        );
        res.status(StatusCode.OK).json(response);
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
            apiResponse(
                StatusCode.INTERNAL_SERVER_ERROR, error.message
            )
        );
    }

}

async function isUserExists(email) {
    try {
        const user = await User.findOne({ email });
        return !!user
    } catch (error) {
        console.error('Error checking user existence:', error);
        return false;
    }
}

module.exports = {
    signUp,
    signIn
}

