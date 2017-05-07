let repoCost = require('../Repository/CostoRepository');
function CostServices() {
    return {
        'newCost':(formCost)=>{
            return new repoCost().insertCost({
                importe:formCost.importe,
                id_tipoMoneda:formCost.idTipoMoneda,
                id_tipoPago:formCost.idTipoPago,
                id_tipoCosto:formCost.idTipoCosto,
                fecha:formCost.Fecha,
                id_usuario:formCost.idUsuario
            });
        }
    }
}

module.exports = CostServices;