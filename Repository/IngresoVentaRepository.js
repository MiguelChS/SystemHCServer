/**
 * Created by mc185249 on 4/29/2017.
 */
/**
 * Created by mc185249 on 4/25/2017.
 */
let Venta = require('../Schema/IngresoVenta');

function ventaRepository() {
    this.insertVenta =(form)=>{
        return new Venta(form).save();
    };

    this.getVenta = ()=>{
        return Venta.aggregate([
            {
                $lookup:{
                    from:"Usuarios",
                    localField:"id_usuario",
                    foreignField:"_id",
                    as:"Usuario"
                }
            }
        ])
    }
}
module.exports = ventaRepository;
