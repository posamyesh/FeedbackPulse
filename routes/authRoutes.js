
const passport = require('passport');
module.exports = (app) => {
    app.use(function(request, response, next) { //creating dummy function for req.session.regenerate since it is not there in passport latest module
        if (request.session && !request.session.regenerate) { //this is writing first because before accessing routes of google auth we make sure our cookie function is working
            request.session.regenerate = (cb) => {
                cb()
            }
        }
        if (request.session && !request.session.save) {
            request.session.save = (cb) => {
                cb()
            }
        }
        next()
    })

    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    )

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) =>{
            res.redirect('/surveys');
        }
        );
    
    app.get('/api/logout', (req, res) => { //To kill the cookie session by using passport, we can delete user data from browser
        req.logOut((err) => { //that means logout
          if (err) {
            // Handle error, if any
            return res.status(500).send('Error logging out'); //if any error occurs
          }
          console.log('you are logged out');
          //res.send(req.user);
          res.redirect('/');
        });
    });
      
      
      

    app.get('/api/current_user', (req, res) => { //after we creating a session using passport we can go to this and view our logged in data
        //console.log('hey user ', req.user.googleId);
        if(req.user == null){
            console.log("user is not logged in");
        }
        res.send(req.user); //req means incoming request, req.user will gives incoming user request details in json format
    });

};