const express = require('express');  // common js syntax for import, ES2015 module
const passport = require('passport');
const GoogleOAuthStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new GoogleOAuthStrategy({
    clientID : keys.googleClientID,
    clientSecret : keys.googleSecretKey,
    callbackURL : '/auth/google/callback'
},
 (accessToken) => {
    console.log(accessToken);
}));

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email']}));
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT_NUMBER = process.env.PORT || 5000
app.listen(PORT_NUMBER);