/**
 * Created by mc185249 on 5/1/2017.
 */
let Cost = require('../Schema/Costos');

function CostRepository() {
    this.insertCost =(form)=>{
        return new Cost(form).save();
    };

    this.getDetalleEgreso=()=>{
        return Cost.aggregate([
            {$lookup:{
                from:"TipoCosto",
                localField:"id_tipoCosto",
                foreignField:"_id",
                as:"TipoCosto"
            }},
            {$unwind: '$TipoCosto'},
            {$project:{
                _id:0,
                fecha:1,
                descripcion:"$TipoCosto.descripcion",
                importe:1,
                "ingreso":"0",
                "Moneda":"$id_tipoMoneda"
            }},
        ])
    };

    this.getEgresoGrafic = ()=>{
        return Cost.aggregate([
            {$project:{
                fecha:1,
                importe:1,
                "cambioDolar":{ $ifNull: [ "$cambioDolar",1]}
            }},
            {$project:{
                fecha:1,
                "importe": { $multiply: [ "$importe", "$cambioDolar" ] }
            }},
            {$group:{
                _id:{month: { $month: "$fecha" }, year: { $year: "$fecha" }},
                egreso:{$sum:"$importe"},
                fecha:{$first:"$fecha"}
            }},
            {$project:{
                _id:0,
                fecha:1,
                egreso:1
            }},
            {$sort:{fecha:1}}
        ])
    };

}
module.exports = CostRepository;