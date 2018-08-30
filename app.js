var express = require('express');
var app = express();

const port = process.env.port || 3000;


app.get('/root/:id', (req,res,nxt) => {
    res.send('hai'+req.params['id']);
});


app.listen(port , () => {
    console.log('Listening ....'+port);
});