const User = require('../model/user.model.js');
const apiResponse = require('../utils/api_response.js');
const StatusCode  = require('../utils/status_code.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../services/auth.js');

const signUp = async (req, res) => {
    
    try {
       
        const { email } = req.body;
        if(await isUserExists(email)) {
            return apiResponse(
                res,
                StatusCode.UNPROCESSABLE_ENTITY, 
                'User with this email already exists!'
            );
        }

        const user = await User.create(req.body);
        
        const responseUser = user.toJSON();
        delete responseUser.password; // Remove the password field to send object to client
        
        apiResponse(
            res, StatusCode.OK, 'User created successfully!', responseUser
        );

    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
        );
    }

}

const signIn = async (req, res) => {
    
    try {
        const { email, password } = req.body;
        const user = await User.findOne( { email } );

        if (!user) {
            return apiResponse(
                res,
                StatusCode.NOT_FOUND,
                'User with this email not found'
            );
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return apiResponse(
                res,
                StatusCode.UNAUTHORIZED,
                'Incorrect Password!'
            );
        }

        const token = generateToken(user._id);

        const responseUser = user.toJSON();
        delete responseUser.password; // Remove the password field to send object to client
        
        responseUser.token = token;

        apiResponse(
            res, StatusCode.OK, 'User Logged in successfully!', responseUser
        );
    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
        );
    }

}

const updateUserPassword = async (req, res) => {
    try {
    
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.userId);

        if(!user) {
            return apiResponse(
                res, StatusCode.UNAUTHORIZED, 'Unauthorized user!'
            );
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return apiResponse(
                res,
                StatusCode.FORBIDDEN,
                'Incorrect Old Password!'
            );
        }

        const hashedPassword = await getHashedPassword(newPassword)
        const updateUser = await User.findByIdAndUpdate(
            user._id,
            { "password": hashedPassword }
        );

        // Checking after updation for consistancy
        if(!updateUser) {
            return apiResponse(
                res, StatusCode.UNAUTHORIZED, 'Unauthenticated user!'
            );
        }

        apiResponse(
            res, StatusCode.OK, 'Your password updated successfully!'
        );

    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

const updateUser = async (req, res) => {
    try {
    
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                "name": name,
                "email": email
            }
        );

        if(!user) {
            return apiResponse(
                res, StatusCode.UNAUTHORIZED, 'Unauthenticated user!'
            );
        }

        const updateUser = await User.findById(user._id);
        const responseUser = { 
            ...updateUser.toJSON(),
             password: undefined 
        };

        apiResponse(
            res, StatusCode.OK, 'Profile Updated successfully!', responseUser
        );
    } catch (error) {
        apiResponse(
            res, StatusCode.INTERNAL_SERVER_ERROR, error.message
        );
    }
}

async function isUserExists(email) {
    try {
        const user = await User.findOne({ email });
        return !!user
    } catch (error) {
        console.error('Error checking user existence: ', error);
        return false;
    }
}

async function getHashedPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

module.exports = {
    signUp,
    signIn,
    updateUser,
    updateUserPassword
}

