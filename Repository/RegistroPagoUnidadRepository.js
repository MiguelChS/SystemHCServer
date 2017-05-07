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
    }
}
module.exports = RegistroPagoRepository;