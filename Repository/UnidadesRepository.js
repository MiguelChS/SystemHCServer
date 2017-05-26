/**
 * Created by mc185249 on 4/24/2017.
 */
let Units = require("../Schema/Unidades");

function UnitsRepository() {
    this.insert =(newUnit) =>{
        return new Units(newUnit).save();
    };

    this.update = (id,form)=>{
        return Units.update({_id:id},form)
    };

    this.delete = (id) =>{
        return Units.remove({_id:id})
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

    this.getAllUnidades = ()=>{
        return Units.aggregate([
            {$lookup:{
                from:"TipoOrientacion",
                localField:"id_orientacion",
                foreignField:"_id",
                as:"orientacion"
            }},
            {$unwind: '$orientacion'},
            {$lookup:{
                from:"VentaUnidad",
                localField:"_id",
                foreignField:"id_unidad",
                as:"venta"
            }},
            {$project:{
                _id:1,
                piso:1,
                unidad:1,
                "orientacion":"$orientacion.descripcion",
                superficieCubierta:1,
                Balcon_terraza:1,
                terraza_externa:1,
                caracteristicas:1,
                venta:{$arrayElemAt:["$venta",0]}
            }},
            {$lookup:{
                from:"EstadoVenta",
                localField:"venta.id_estadoVenta",
                foreignField:"_id",
                as:"estadoVenta"
            }},
            {$lookup:{
                from:"EstadoVenta",
                localField:"venta.id_estadoVenta",
                foreignField:"_id",
                as:"estadoVenta"
            }},
            {$project:{
                _id:1,
                piso:1,
                unidad:1,
                orientacion:1,
                superficieCubierta:1,
                Balcon_terraza:1,
                terraza_externa:1,
                caracteristicas:1,
                estado:{$arrayElemAt:["$estadoVenta",0]}
            }},
            {$project:{
                _id:1,
                piso:1,
                unidad:1,
                orientacion:1,
                superficieCubierta:1,
                Balcon_terraza:1,
                terraza_externa:1,
                caracteristicas:1,
                "estado":{ $ifNull: [ "$estado.descripcion", "No Vendido" ] }
            }}
        ])
    }
}

module.exports = UnitsRepository;