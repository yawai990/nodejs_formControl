const userModel = require("../model/userModel");
const bcrypt =require('bcrypt');

const loginForm =(req,res)=>{
    res.status(200).render('login')
};

const registerForm = (req,res)=>{
    res.status(200).render('register')
}

const registerUser = async (req,res)=>{
    const {email,username,password,c_password} = req.body;
    let errors =[];

    if(!email || !username || !password || !c_password){
        errors.push({message:'Please fill all the require fileds'})
    }
    if(password !== c_password){
        errors.push({message:'Passwords did not matched'});
        
    };

    //if something went wrong 
    if(errors.length > 0){
        res.render('register',{errors,username,email})
    }else{
        try {
                userModel.findOne({email})
                .then(user=>{
                    if(user){
                       errors.push({message:'Email is already register'})
                        res.render('register',{
                            errors,email
                        })
                    }else{
                        const newuser  = new userModel({
                            name,email,password
                        });

                        //hashin the password
                       bcrypt.hash(password,10,(err,hashPassword)=>{
                        newuser.password = hashPassword;
                        newuser.save()
                        .then(user=>{
                            req.flash('success','you are now registerd and can log in')
                        })
                        .catch(err=>console.log(err))
                       })
                    }
                })
        } catch (error) {
                error.push(error.message)
        }   
    }
}

module.exports = {loginForm,registerForm,registerUser};