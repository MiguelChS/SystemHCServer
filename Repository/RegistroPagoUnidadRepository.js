/**
 * Created by mc185249 on 5/6/2017.
 */
let RegistroPago = require('../Schema/RegistroPagoUnidad');

function RegistroPagoRepository() {
    this.insert =(form)=>{
        return new RegistroPago(form).save();
    };
    this.getByIdVenta =(idVenta)=>{
        return RegistroPago.aggregate([
            {$match:{id_venta:idVenta}},
            {$lookup:
            {
                from:"TipoMoneda",
                localField:"id_tipoMoneda",
                foreignField:"_id",
                as:"Moneda"
            }
            },
            {$unwind: '$Moneda'},
            {$project:{
                _id:0,
                importe:1,
                "Moneda":"$Moneda.descripcion",
                id_venta:1
            }}
        ])
    };

    this.getVentaGrafic =()=>{
        return RegistroPago.aggregate([
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
                ingreso:{ $addToSet: "$total" },
                fecha:{$first:"$fecha"}
            }},
            {$project:{
                _id:0,
                fecha:1,
                ingreso:1
            }},
            {$sort:{fecha:1}}
        ])
    };

    this.getDetalleIngreso =()=>{
        return RegistroPago.aggregate([
            {$lookup:{
                from:"TipoPago",
                localField:"id_tipoPago",
                foreignField:"_id",
                as:"TipoPago"
            }},
            {$unwind: '$TipoPago'},
            {$project:{
                _id:0,
                importe:1,
                fecha:1,
                "ingreso":"1",
                "descripcion":"$TipoPago.descripcion",
                "Moneda":"$id_tipoMoneda"
            }}
        ])
    };

}
module.exports = RegistroPagoRepository;