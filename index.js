const express = require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send({hey:'we can do it'});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT);