/**
 * Created by mc185249 on 4/25/2017.
 */
let StateSale = require("../Schema/EstadoVenta");

function StateSaleRepository() {
    this.getStateSale = ()=>{
        return new Promise((resolve,reject)=>{
            StateSale.aggregate([
                {$project:
                {
                    _id:0,
                    "value":"$_id",
                    "label":"$descripcion"
                }
                }
            ]).then((result)=>{
                resolve({StateSale:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = StateSaleRepository;