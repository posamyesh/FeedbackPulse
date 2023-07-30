const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport'); //beacuse passport file is not giving any output to store so just require is enough


mongoose.connect(keys.mongoURI);


const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app); //call authroutes file and immedetly calling the function with app object
require('./routes/billingRoute')(app);

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));
    //express will return index.html file if it is deos not find incoming request route handler
    const path = require('path');
    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);