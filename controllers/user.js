const db = require('../config/mongoose');
const userSchema = require('../models/user');

module.exports.signIn = function (request, response) {
    return response.render('user_sign_in', {title : 'Sign In'});
}
module.exports.signUp = function(request, response) {
    return response.render('user_sign_up', {title : 'Sign Up'});
}
module.exports.add = function(request, response) {
    userSchema.create({
        name : request.body.name,
        email : request.body.email,
        password : request.body.password
    }, function(error) {
        if(error){
            console.error('Error in Adding new User');
            return response.end(error);
        } else {
            console.log('New User Added In Database');
            return response.render('user_sign_in', {title : 'Sign In'});
        }
    });
}
module.exports.autheticate = function(request, response) {
    userSchema.findOne({email : request.body.email},function(error, users) {
        if(error){
            console.log('Error in Finding Users');
            return response.redirect('back');
        }else{
            if(users.length == 0) {
                console.log('No Users found');
                return response.redirect('back');
            }else if (users.password != request.body.password) {
                console.log('Incorrect password');
                return response.redirect('back');
            }else return response.render('profile', {title : 'Welcome67', name : users.name});
        }
    });
}