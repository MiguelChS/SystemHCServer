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
                    from:"VentaUnidad",
                    localField:"_id",
                    foreignField:"id_unidad",
                    as:"leftJoin"
                }},
                {$match:{"leftJoin": { $size: 0}}},
                {$lookup:{
                    from:"TipoOrientacion",
                    localField:"id_orientacion",
                    foreignField:"_id",
                    as:"orientacionJoin"
                }},
                {$unwind: '$orientacionJoin'},
                {$project:{
                    _id:0,
                    "value":"$_id",
                    "label":"$unidad",
                    piso:1,
                    "orientacion":"$orientacionJoin.descripcion",
                    caracteristicas:1,
                    superficie:"$superficieCubierta",
                    balcon:"$Balcon_terraza",
                    terraza:"$terraza_externa"
                }}
            ]).then((result)=>{
                resolve({Units:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    };

    this.getUnitById=(idUnit)=>{
        return Units.aggregate([
            {$match:{_id:idUnit}},
            {$lookup:{
                from:"TipoOrientacion",
                localField:"id_orientacion",
                foreignField:"_id",
                as:"orientacionJoin"
            }},
            {$unwind: '$orientacionJoin'},
            {$project:{
                _id:0,
                "value":"$_id",
                "label":"$unidad",
                piso:1,
                "orientacion":"$orientacionJoin.descripcion",
                caracteristicas:1,
                superficie:"$superficieCubierta",
                balcon:"$Balcon_terraza",
                terraza:"$terraza_externa"
            }}
        ])
    }
}

module.exports = UnitsRepository;