const jwt = require('jsonwebtoken');
var UserModel = require("../models/users");
const bcrypt = require('bcrypt');

var authService = {

    signUser: function(user){
        const token = jwt.sign({
            username: user.username,
            id: user._id,
            isAdmin: user.isAdmin
        }, '991abd0371a608a298b01cba186f7c5c', {
            expiresIn: '1d'
        });
        return token;
    },
    verifyUser: async function(token){
        try {
            let decoded = jwt.verify(token, "991abd0371a608a298b01cba186f7c5c");  
            return await UserModel.findById(decoded.id).exec();
        }
        catch (err){
            console.log("Couldn't verify user: "+err)
            return null;
        }
    }

};

module.exports = authService;