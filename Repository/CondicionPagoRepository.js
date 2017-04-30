/**
 * Created by mc185249 on 4/25/2017.
 */
let ConditionPayment = require("../Schema/CondicionPago");

function ConditionPaymentRepository() {
    this.getConditionPayment = ()=>{
        return new Promise((resolve,reject)=>{
            ConditionPayment.aggregate([
                {$project:
                {
                    _id:0,
                    "value":"$_id",
                    "label":"$descripcion"
                }
                }
            ]).then((result)=>{
                resolve({ConditionPayment:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = ConditionPaymentRepository;