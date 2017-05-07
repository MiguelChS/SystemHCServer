/**
 * Created by mc185249 on 5/6/2017.
 */
let repoRegisPago = require('../Repository/RegistroPagoUnidadRepository');
function PagoServices() {
    return {
        'newPago':(formPago)=>{
            return new repoRegisPago().insert({
                id_venta:formPago.idVenta,
                importe:formPago.importe,
                id_tipoPago: "590e260ae7f7b86989c2b20c",
                fecha:formPago.Fecha,
                id_tipoMoneda:formPago.idTipoMoneda,
                id_formaPago:formPago.idFormaPago,
                id_usuario:formPago.idUsuario
            })
        }
    }
}

module.exports = PagoServices;