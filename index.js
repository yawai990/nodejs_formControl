const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app =express();
const mongoose = require('mongoose');
const session = require('express-session');
const userRouter = require('./routes/user');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const { isAuthenticate } = require('./middleware/auth');
const PORT = process.env.PORT || 5000;

//get the public folder
const publicDir = require('path').join(__dirname,'public')

require('dotenv').config();

//passport config
require('./config/passport')(passport);


//database
  mongoose.connect(process.env.dbURL,{
                                  useNewUrlParser:true,
                                  useUnifiedTopology:true
  })
  .then(()=>console.log('db connected'))
  .catch(err=>console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(publicDir));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.fail = req.flash('fail');
    res.locals.error = req.flash('error');
    next()
})


app.use('/user',userRouter);
app.get('/',(req,res)=>res.redirect('/user/login'));
app.get('/dashboard',isAuthenticate,(req,res)=>{
  res.render('Home',{userData:req.user})
});


app.listen(PORT,()=>console.log('server is running in port 5000'));