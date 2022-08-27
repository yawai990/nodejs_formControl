const express = require('express');
const passport = require('passport');
const { loginForm,registerForm,registerUser } = require('../controller/user');
const userRouter = express.Router();

userRouter.get('/login',loginForm)
                .get('/register',registerForm)
                 .post('/login', (req, res, next) => {
                    passport.authenticate('local', {
                      successRedirect: '/dashboard',
                      failureRedirect: '/user/login',
                      failureFlash: true
                    })(req, res, next);
                  })
                  .post('/register',registerUser)

module.exports = userRouter;