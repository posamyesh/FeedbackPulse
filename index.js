const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send({hi:'we are back baby'});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT);