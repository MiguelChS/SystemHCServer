/**
 * Created by mc185249 on 5/7/2017.
 */
let repoCost = require('../Repository/CostoRepository');
let repoRegistro = require('../Repository/RegistroPagoUnidadRepository');
let repoAporte = require('../Repository/AporteSocioRepository');
let repoProjecto = require('../Repository/inicioProjectoRepository');
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
                        //ordenamos
                        Detalle = Detalle.sort((a,b)=>{ return a.fecha - b.fecha });
                        //hacemos las cuentas
                        Detalle = operarDetalle(Detalle);
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
        },

        'getCashFlow':()=>{
            return new Promise((resolve,reject)=>{
                let arrayPromise = [];
                arrayPromise.push(new repoCost().getEgresoGrafic());
                arrayPromise.push(new repoRegistro().getVentaGrafic());
                arrayPromise.push(new repoAporte().getAporteInicial());
                arrayPromise.push(new repoAporte().getAporteRefuerzo());
                arrayPromise.push(new repoProjecto().get());
                Promise.all(arrayPromise)
                    .then((result)=>{
                        let ventaCostoReal = agrupar({
                            egreso:result[0],
                            ingreso:result[1]
                        });
                        resolve(agruparCashFlow({ventaCostoReal,result}));
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            })
        }

    }
}

function agruparCashFlow(res) {
    let AporteInicial = res.result[2];
    let TiempoGrafico = res.result[4].DetalleControIngreso;
    let AporteRefuerzo = res.result[3];
    return TiempoGrafico.map((obj,index)=>{
        let fecha = moment.utc(obj.fecha).format("YYYY-MM-DD");
        let costIngreRegal = res.ventaCostoReal.find(x  => x.fecha == fecha);
        let inversion = AporteRefuerzo.find(x => moment.utc(x.fecha).startOf('month').format("YYYY-MM-DD") == fecha);
        if(index == 0){
            inversion = AporteInicial;
        }else{
            inversion = inversion ? inversion.totalAporte : 0
        }
        return {
            fecha:fecha,
            costoEs:obj.costo,
            ingresoEs:obj.ingreso,
            costoR:costIngreRegal ? costIngreRegal.egreso : 0,
            ingresoR:costIngreRegal ? costIngreRegal.ingreso : 0,
            inversion: inversion
        }
    });

}

function operarDetalle(list) {
    let lastCajaDolar = null;
    let lastCajaPesos = null;
    let tabla = list.map((obj,index)=>{
        if(index == 0){
            if(obj.Moneda.toString() == '58fecf3f3b2ef968436b332c'){
                obj["icon"] = 'US$';
                lastCajaDolar = parseInt(obj.ingreso,10) ? obj.importe : obj.importe * -1;
                obj["CajaDolar"] =  lastCajaDolar;
            }else{
                obj["icon"] = '$';
                lastCajaPesos = parseInt(obj.ingreso,10) ? obj.importe : obj.importe * -1;
                obj["CajaPesos"] = lastCajaPesos;
            }
        }else{
            if(obj.Moneda.toString() == '58fecf3f3b2ef968436b332c'){
                if(lastCajaDolar != null){
                    obj["icon"] = 'US$';
                    lastCajaDolar = parseInt(obj.ingreso,10) ? lastCajaDolar + obj.importe : lastCajaDolar + obj.importe * -1;
                    obj["CajaDolar"] = lastCajaDolar;
                }else{
                    obj["icon"] = 'US$';
                    lastCajaDolar = parseInt(obj.ingreso,10) ? obj.importe : obj.importe * -1;
                    obj["CajaDolar"] = lastCajaDolar;
                }
            }else{
                if(lastCajaPesos != null){
                    obj["icon"] = '$';
                    lastCajaPesos = parseInt(obj.ingreso,10) ? lastCajaPesos + obj.importe : lastCajaPesos + obj.importe * -1;
                    obj["CajaPesos"] = lastCajaPesos;
                }else{
                    obj["icon"] = '$';
                    lastCajaPesos = parseInt(obj.ingreso,10) ? obj.importe : obj.importe * -1;
                    obj["CajaPesos"] = lastCajaPesos;
                }
            }
        }
        return obj;
    });
    return {
        tabla:tabla,
        totalDolar:lastCajaDolar,
        totalPesos:lastCajaPesos
    };
}

function agrupar(res) {
    let aux = [];
    for(let i = 0; i < res.egreso.length ; i++){
        let egre = res.egreso;
        aux.push({
            fecha: moment.utc(egre[i].fecha).startOf("month").format("YYYY-MM-DD"),
            egreso:egre[i].egreso,
            ingreso:0
        });
    }
    for(let i = 0; i < res.ingreso.length ; i++){
        let ingre = res.ingreso;
        let auxIndice = null;
        let resultFin = aux.find((obj,index)=>{
            if(obj.fecha == moment.utc(ingre[i].fecha).startOf("month").format("YYYY-MM-DD")){
                auxIndice = index;
                return true;
            }
        });
        if(resultFin){
            aux[auxIndice].ingreso = ingre[i].ingreso;
        }else{
            aux.push({
                fecha: moment.utc(ingre[i].fecha).startOf("month").format("YYYY-MM-DD"),
                egreso:0,
                ingreso:ingre[i].ingreso
            });
        }
    }
    return aux;
}

module.exports = CostServices;

