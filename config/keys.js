//we write some logic to find out whether we are in prod(production) or dev(local server)

if(process.env.RAILWAY_ENVIRONMENT === 'production'){
    //we are in production environment
}
else{
    //we are in local server i,e development environment
    module.exports = require('./dev');
}