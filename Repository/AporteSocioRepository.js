/**
 * Created by mc185249 on 4/29/2017.
 */
let Aporte = require('../Schema/AporteSocio');

function AporteRepository() {
    this.insertVenta =(form)=>{
        return new Aporte(form).save();
    };
}
module.exports = AporteRepository;