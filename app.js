/**
 * Created by mc185249 on 2/16/2017.
 */
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let api = require("./API/index");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api",api(express.Router()));

process.on('SIGINT',() => {
    mongoose.connections.forEach((value) => {
        value.close();
    });
    process.exit(1);
});

connect()
    .on('error', ()=>{})
    .on('disconnected', connect)
    .once('open', ()=>{
        app.listen(3001,()=>{
            console.log(3001);
        });
    });



function connect () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect('mongodb://localhost/SystemHCDB', options).connection;
}

 module.exports = app;