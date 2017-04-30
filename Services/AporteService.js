/**
 * Created by mc185249 on 4/29/2017.
 */
let repoAporte = require('../Repository/AporteSocioRepository');
function AporteServices() {
    return {
        'newAporte':(formAporte)=>{
            return new repoAporte().insertVenta({
                importe:formAporte.importe,
                id_tipoMoneda:formAporte.idTipoMoneda,
                id_persona:formAporte.idSocio,
                id_tipoAporte:formAporte.idTipoAporte,
                fecha:formAporte.Fecha,
                id_usuario:formAporte.id_usuario
            });
        }
    }
}

module.exports = AporteServices;