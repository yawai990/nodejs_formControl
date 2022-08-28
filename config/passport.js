const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//model 
const userModel = require('../model/userModel');

module.exports =function(passport){
                        passport.use(new LocalStrategy({usernameField:'email'}
                             ,(email,password,done)=>{
                                userModel.findOne({email},(err,user)=>{
                                    if(!user){
                                        return done(null,false,{message:'Email is not registered'})
                                    }
                                    else{
                                        if(!password){
                                            return done(null,fail,{message:'please fill the correct password'})
                                        }
                                        //compare the password
                                        bcrypt.compare(password,user.password,(err,isMatch)=>{
                                            if(!isMatch){
                                                return done(null,false,{message:'Password incorrect'})
                                            } 
                                            return done(null,user)
                                        });
                                    }
                                });
                            }
                        ));

                        passport.serializeUser((user,done)=>done(null,user));

                        passport.deserializeUser(function(user,done){
                            userModel.findById(user._id,(err,user)=>done(err,user));
                        });
};