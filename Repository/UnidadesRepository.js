/**
 * Created by mc185249 on 4/24/2017.
 */
let Units = require("../Schema/Unidades");

function UnitsRepository() {
    this.insert =(newUnit) =>{
        return new Units(newUnit).save();
    };

    this.getUnits = ()=>{
        return new Promise((resolve,reject)=>{
            Units.aggregate([
                {$lookup:{
                    from:"IngresoVenta",
                    localField:"_id",
                    foreignField:"id_unidad",
                    as:"leftJoin"
                }},
                {$match:{"leftJoin": { $size: 0}}},
                {$project:{
                    _id:0,
                    "value":"$_id",
                    "label":"$unidad"
                }}
            ]).then((result)=>{
                resolve({Units:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    };
}

module.exports = UnitsRepository;