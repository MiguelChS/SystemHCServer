/**
 * Created by mc185249 on 4/25/2017.
 */
let TypeMoney = require("../Schema/TipoMoneda");

function TypeMoneyRepository() {
    this.getTypeMoney = ()=>{
        return new Promise((resolve,reject)=>{
            TypeMoney.aggregate([
                {$project:
                {
                    _id:0,
                    "value":"$_id",
                    "label":"$descripcion"
                }
                }
            ]).then((result)=>{
                resolve({TypeMoney:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = TypeMoneyRepository;