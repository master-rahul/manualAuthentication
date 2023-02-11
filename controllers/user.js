const db = require('../config/mongoose');
const userCollection = require('../models/user');

module.exports.signIn = function (request, response) {
    return response.render('user_sign_in', {title : 'Sign In'});
}
module.exports.signUp = function(request, response) {
    return response.render('user_sign_up', {title : 'Sign Up'});
}
module.exports.signOut = function(request, response) {
    response.clearCookie('user_id');
    return response.redirect('/user/sign-in');
}
module.exports.add = function(request, response) {
    if(request.body.password != request.body.confirm_password) return response.redirect('back');
    userCollection.create({
        name : request.body.name,
        email : request.body.email,
        password : request.body.password
    }, function(error) {
        if(error){
            console.error('Error in Adding new User');
            return response.redirect('back');
        } else {
            console.log('New User Added In Database');
            return response.render('user_sign_in', {title : 'Sign In'});
        }
    });
}
module.exports.autheticate = function(request, response) {
    userCollection.findOne({email : request.body.email},function(error, users) {
        if(error){
            console.log('Error in Finding Users');
            return response.redirect('back');
        }else{
            if(users == null) {
                console.log('No Users found');
                return response.redirect('back');
            }else if (users.password != request.body.password) {
                console.log('Incorrect password');
                return response.redirect('back');
            }else {
                response.cookie('user_id', users.id);
                return response.redirect('/user/profile');
            }
        }
    });
}
module.exports.profile = function(request, response) {
    console.log(request.cookies);
    if(request.cookies.user_id){
        userCollection.findById(request.cookies.user_id, function(error, user){
            if(error){
                console.log('Error in finding the user');
                return response.redirect('/user/sign-in');
            }else{
                if(user){
                    console.log('User is authorized');
                    return response.render('profile', {title: 'Welcome', user : user});
                }else return response.redirect('/user/sign-in');
            }
        });
    } else return response.redirect('/user/sign-in');
}
