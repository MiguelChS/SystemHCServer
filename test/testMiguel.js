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
    let testR = require('../Services/GraphicService');
    testR().getGraficCaja()
        .then((res)=>{
            let aux = [];
            for(let i = 0; i < res.Graphic.egreso.length ; i++){
                let egre = res.Graphic.egreso;
                aux.push({
                    fecha: egre[i].fecha,
                    egreso:egre[i].total,
                    ingreso:[]
                });
            }
            for(let i = 0; i < res.Graphic.ingreso.length ; i++){
                let ingre = res.Graphic.ingreso;
                let auxIndice = null;
                let resultFin = aux.find((obj,index)=>{
                     if(moment.utc(obj.fecha).format("YYYY-MM-DD") == moment.utc(ingre[i].fecha).format("YYYY-MM-DD")){
                        auxIndice = index;
                         return true;
                     }
                 });
                 if(resultFin){
                    aux[auxIndice].ingreso = ingre[i].total;
                 }else{
                    aux.push({
                        fecha: ingre[i].fecha,
                        egreso:[],
                        ingreso:ingre[i].total
                    });
                 }
            }
            aux = aux.sort((a,b)=>{ return a.fecha - b.fecha });
        })
        .catch((err)=>{
            console.log(err)
        })
}