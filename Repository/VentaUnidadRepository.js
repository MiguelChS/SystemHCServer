/**
 * Created by mc185249 on 4/29/2017.
 */
/**
 * Created by mc185249 on 4/25/2017.
 */
let Venta = require('../Schema/VentaUnidad');

function ventaRepository() {
    this.insertVenta =(form)=>{
        return new Venta(form).save();
    };
    this.update = (form,idVenta) =>{
        return Venta.update({_id:idVenta},form)
    }
}
module.exports = ventaRepository;
