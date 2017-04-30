/**
 * Created by mc185249 on 4/29/2017.
 */
/**
 * Created by mc185249 on 4/24/2017.
 */
let repoIngreso = require('../Repository/IngresoVentaRepository');
function IngresoServices() {
    return {
        'newIngreso':(formIngreso)=>{
                //validamos
            return new repoIngreso().insertVenta({
                    id_unidad:formIngreso.idUnidad,
                    id_propietario:formIngreso.idPropietario,
                    id_estadoVenta:formIngreso.idEstadoVenta,
                    fechaVenta:formIngreso.Fecha,
                    id_CondicionPago:formIngreso.idCondicionPago,
                    cantidadPago:formIngreso.cantidadPago,
                    id_tipoMoneda:formIngreso.idTipoMoneda,
                    importe:formIngreso.importe,
                    id_tipoPago:formIngreso.TipoPago,
                    id_usuario:formIngreso.idUsuario
                });
        }
    }
}

module.exports = IngresoServices;