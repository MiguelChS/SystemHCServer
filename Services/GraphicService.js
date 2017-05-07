/**
 * Created by mc185249 on 5/7/2017.
 */
let repoCost = require('../Repository/CostoRepository');
let repoRegistro = require('../Repository/RegistroPagoUnidadRepository');
let moment = require('moment');

function CostServices() {
    return {
        'getGraficCaja':()=>{
            return new Promise((resolve,reject)=>{
                let arrayPromise=[];
                arrayPromise.push(new repoCost().getDetalleEgreso());
                arrayPromise.push(new repoRegistro().getDetalleIngreso());
                arrayPromise.push(new repoCost().getEgresoGrafic());
                arrayPromise.push(new repoRegistro().getVentaGrafic());

                Promise.all(arrayPromise)
                    .then((result)=>{
                        let Detalle = [...result[0],...result[1]];
                        Detalle = Detalle.sort((a,b)=>{ return a.fecha - b.fecha });
                        resolve({
                            tabla:Detalle,
                            Graphic:agrupar({
                                egreso:result[2],
                                ingreso:result[3]
                            })
                        });
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            })
        }

    }
}

function agrupar(res) {
    let aux = [];
    for(let i = 0; i < res.egreso.length ; i++){
        let egre = res.egreso;
        aux.push({
            fecha: egre[i].fecha,
            egreso:egre[i].total,
            ingreso:0
        });
    }
    for(let i = 0; i < res.ingreso.length ; i++){
        let ingre = res.ingreso;
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
                egreso:0,
                ingreso:ingre[i].total
            });
        }
    }
    return aux.sort((a,b)=>{ return a.fecha - b.fecha });
}

module.exports = CostServices;

