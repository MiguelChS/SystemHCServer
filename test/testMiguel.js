/**
 * Created by mc185249 on 4/29/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/SystemHCDB').connection
    .on('error', ()=>{})
    .on('disconnected',()=>{})
    .once('open', ()=>{
        test();
    });

function test() {
    let testR = require('../Repository/PersonaRepository');
    new testR().getOwner('92934431')
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err)
        })
}