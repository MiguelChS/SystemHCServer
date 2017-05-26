let repoCost = require('../Repository/CostoRepository');
function CostServices() {
    return {
        'newCost':(formCost)=>{
            return new repoCost().insertCost({
                importe:formCost.importe,
                id_tipoMoneda:formCost.idTipoMoneda,
                id_formaPago:formCost.idTipoPago,
                id_tipoCosto:formCost.idTipoCosto,
                fecha:formCost.Fecha,
                cambioDolar:formCost.cambioDolar,
                id_usuario:formCost.idUsuario
            });
        }
    }
}

module.exports = CostServices;