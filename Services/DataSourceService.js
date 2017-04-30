/**
 * Created by mc185249 on 4/23/2017.
 */
let repoTypeDocument = require('../Repository/TipoDocumentoRepository');
let repoTypeOrientation = require('../Repository/TipoOrientacionRepository');
let repoStateSale = require('../Repository/EstadoVentaRepository');
let repoConditionPayment = require('../Repository/CondicionPagoRepository');
let repoTypeMoney= require('../Repository/TipoMonedaRepository');
let repoTypePayment = require('../Repository/TipoPagoRepository');
let repoUnits = require('../Repository/UnidadesRepository');
function DataSourceServices() {
    return {
        'getAll':()=>{
            return new Promise((resolve,reject)=>{
                let arrayPromise = [];
                arrayPromise.push( new repoTypeDocument().getTypeDocument());
                arrayPromise.push( new repoTypeOrientation().getTypeOrientation());
                arrayPromise.push( new repoStateSale().getStateSale());
                arrayPromise.push( new repoConditionPayment().getConditionPayment());
                arrayPromise.push( new repoTypeMoney().getTypeMoney());
                arrayPromise.push( new repoTypePayment().getTypePayment());
                arrayPromise.push(new repoUnits().getUnits());
                Promise.all(arrayPromise)
                    .then((value)=>{
                        var result = {};
                        value.map((a)=>{
                            for(let attr in a){
                                if(a.hasOwnProperty(attr))result[attr] = a[attr]
                            }
                        });
                        resolve(result);
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            })
        }
    }
}

module.exports = DataSourceServices;