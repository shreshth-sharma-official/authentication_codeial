const express = require('express');
const app = express();
const port = 8000;
// this is for cookie
const cookieparser=require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//express session 

const session=require('express-session');
const passport=require('passport');
const passportlocal=require('./config/passport-local-statergy');

//here we tell app to use cookie parser
app.use(cookieparser());
app.use(express.static('./assets'));

app.use(expressLayouts);

//this is for bodyparser
var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// set up middle-ware of express session
app.use(session({
    name:'codial',
    secret:"something",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
