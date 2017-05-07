/**
 * Created by mc185249 on 4/29/2017.
 */
let mongoose = require("mongoose");
let moment = require("moment");
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/SystemHCDB').connection
    .on('error', ()=>{})
    .on('disconnected',()=>{})
    .once('open', ()=>{
        test();
    });

function test() {
    let testR = require('../Services/PersonaServices');
    let testUnit = require("../Repository/UnidadesRepository");
    let testRegis = require("../Repository/RegistroPagoUnidadRepository");
    console.log(moment.utc().format("YYYY-MM-DD"));
    testR().getPersonWithUnits({numberDocument :'93874151'})
        .then((res)=>{
            console.log(res[0].unidades);
            //bucar la unidad y la plata de la reserva
        })
        .catch((err)=>{
            console.log(err)
        })
}