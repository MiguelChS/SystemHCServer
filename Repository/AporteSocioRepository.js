/**
 * Created by mc185249 on 4/29/2017.
 */
let mongoose = require('mongoose');
let Aporte = require('../Schema/AporteSocio');

function AporteRepository() {
    this.insertAporte =(form)=>{
        return new Aporte(form).save();
    };

    this.getAporteInicial = ()=>{
        return Aporte.aggregate([
            {$match:{id_tipoAporte:mongoose.Types.ObjectId("59054b182c5cd0dfd8cad3a8")}},
            {$group:{
                _id:{"Moneda":"$id_tipoMoneda"},
                total:{ $sum: "$importe" }
            }},
            {$project:{
                _id:0,
                "Moneda":"$_id.Moneda",
                total:1
            }}
        ])
    };

    this.getAporteRefuerzo = ()=>{
        return Aporte.aggregate([
            {$match:{id_tipoAporte:mongoose.Types.ObjectId("59054b2d2c5cd0dfd8cad3c0")}},
            {$group:{
                _id:{month: { $month: "$fecha" }, year: { $year: "$fecha" },"Moneda":"$id_tipoMoneda"},
                total:{ $sum: "$importe" },
                fecha:{$first:"$fecha"}
            }},
            {$project:{
                _id:0,
                fecha:1,
                total:{
                    "total":"$total",
                    "Moneda":"$_id.Moneda"
                }
            }},
            {$group:{
                _id:{month: { $month: "$fecha" }, year: { $year: "$fecha" }},
                totalAporte:{ $addToSet: "$total" },
                fecha:{$first:"$fecha"}
            }},
            {$project:{
                _id:0,
                fecha:1,
                totalAporte:1
            }},
            {$sort:{fecha:1}}
        ])
    }
}
module.exports = AporteRepository;