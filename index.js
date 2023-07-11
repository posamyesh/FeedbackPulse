const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send({hi:'we are back baby'});
});


app.listen(5000);