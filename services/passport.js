
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');


const User = mongoose.model('users');

passport.serializeUser((user,done) =>{ //it will identify the user record with unique id which is generated by mongoDB
    done(null, user.id); //for further requests after logged in (type of cookie)
});

passport.deserializeUser((id, done) => {
    User.findById(id) .then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id}) //checking if profile is already exists in our data base
        
        if(existingUser){ //if exists then say hi to him
            console.log('welcome back! ', profile.displayName)
            done(null, existingUser);
        }
        else{
            const user =  await new User({googleId: profile.id}).save()
            done(null, user);
        }
        //if not then create a new record of the user
                    
        
    })
);