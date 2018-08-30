var particle_credentials = require('./environment/particle_cred'); // remove
var express = require("express");
var bodyParser = require('body-parser');

var Particle = require('particle-api-js');
var particle = new Particle();
var token = particle_credentials.p_token ; // Include tokken inside header - 
var deviceId = particle_credentials.p_deviceId; 


//process.exit();

var fs = require('fs');
const app = express();

const morgan = require('morgan')
//config
const port = process.env.port || 3001;

//app.use(bodyParser());
//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }))

//To parse json data
app.use(bodyParser.json())

app.use(morgan('combined',
    {
        stream: fs.createWriteStream('./access.log', {flags: 'a'}),
        timestamp: true
    }
    ))

app.get("/middleman/", (req,res) => {
    res.send("hellow from get sa-test")
})

app.get("/middleman/devices/:id", (req,res) => {
    console.log('Connection devices/id get')
    res.send("hellow from get sa-test")
})

app.post("/middleman/devices/:id", (req,res) => {
    console.log('Connection devices/id post '+req.params.id);
    console.log(req.body.locked);
    ledControl(req.body.locked);
    res.send("hellow from post sa-test")
})

app.post("/middleman/webhook/", (req,res) => {
    console.log('Connection webhook post ')
    console.log(req.body)
    res.send("hellow from post sa-test")
})



function ledControl(arg){
    var fnPr = particle.callFunction({ deviceId: deviceId, name: 'LOCK', argument: arg, auth: token });

    console.log('turning...' + arg);
    fnPr.then(
    function(data) {
        console.log('Function called succesfully:', data);
    }, function(err) {
        console.log('An error occurred:', err);
    });

}


app.listen(port, () => {
    console.log("Server running at {port}.... "+port);
});