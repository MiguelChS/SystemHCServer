/**
 * Created by mc185249 on 4/25/2017.
 */
let TypePayment = require("../Schema/TipoPago");

function TypePaymentRepository() {
    this.getTypePayment = ()=>{
        return new Promise((resolve,reject)=>{
            TypePayment.aggregate([
                {$project:
                {
                    _id:0,
                    "value":"$_id",
                    "label":"$descripcion"
                }
                }
            ]).then((result)=>{
                resolve({TypePayment:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = TypePaymentRepository;