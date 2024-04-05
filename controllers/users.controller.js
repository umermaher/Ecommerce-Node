const { response } = require('express');
const User = require('../model/user.model.js');
const apiResponse = require('../utils/api_response.js')

const signUp = async (req, res) => {
    
    try {
        const user = await User.create(req.body);
        
        const responseUser = user.toJSON();
        delete responseUser.password; // Remove the password field 
        const response = apiResponse(
            200, 'User created successfully!', responseUser
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(
            apiResponse(500, error.message)
        );
    }

}

module.exports = {
    signUp
}

