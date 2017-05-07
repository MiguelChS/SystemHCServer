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
                from:"TipoMoneda",
                localField:"id_tipoMoneda",
                foreignField:"_id",
                as:"Moneda"
            }},
            {$unwind: '$Moneda'},
            {$lookup:{
                from:"TipoCosto",
                localField:"id_tipoCosto",
                foreignField:"_id",
                as:"TipoCosto"
            }},
            {$unwind: '$TipoCosto'},
            {$project:{
                _id:0,
                importe:1,
                fecha:1,
                "Moneda":"$Moneda.descripcion",
                "idMoneda":"$Moneda._id",
                "descripcion":"$TipoCosto.descripcion",
                "ingreso":"0"
            }},
            {$sort:{fecha:1}}
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
                _id:{month: { $month: "$fecha" }, day: { $dayOfMonth: "$fecha" }, year: { $year: "$fecha" }},
                total:{$sum:"$importe"},
                fecha:{$first:"$fecha"}
            }},
            {$project:{
                _id:0,
                fecha:1,
                total:1
            }},
            {$sort:{fecha:1}}
        ])
    };

}
module.exports = CostRepository;