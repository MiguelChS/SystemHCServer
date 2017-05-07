/**
 * Created by mc185249 on 4/29/2017.
 */
/**
 * Created by mc185249 on 4/24/2017.
 */
let repoIngreso = require('../Repository/VentaUnidadRepository');
let repoRegistroPago = require("../Repository/RegistroPagoUnidadRepository");
function IngresoServices() {
    return {
        'newIngreso':(formIngreso)=>{
            let ingreso = {
                id_unidad:formIngreso.idUnidad,
                id_persona:formIngreso.idPropietario,
                id_estadoVenta:formIngreso.TipoVenta,
                fechaVenta:formIngreso.Fecha,
                cantidadPago:formIngreso.cantidadPago,
                id_tipoMoneda:formIngreso.idTipoMonedaCuota,
                importe:formIngreso.importeCuota,
                id_usuario:formIngreso.idUsuario
            };
             let registroPago={
                 id_venta:formIngreso.Reserva,
                 importe:formIngreso.importeAdelanto,
                 id_tipoPago: formIngreso.TipoVenta == "58fece623b2ef968436b32c6" ? "590e262fe7f7b86989c2b21f":"590e2621e7f7b86989c2b219",//adelanto o reserva
                 fecha:formIngreso.Fecha,
                 id_tipoMoneda:formIngreso.tipoMonedaAdelanto,
                 id_formaPago:formIngreso.tipoPagoAdelanto,
                 id_usuario:formIngreso.idUsuario
             };

             if(formIngreso.Reserva){
                 //update
                 ingreso = {
                     id_estadoVenta:formIngreso.TipoVenta,
                     fechaVenta:formIngreso.Fecha,
                     cantidadPago:formIngreso.cantidadPago,
                     id_tipoMoneda:formIngreso.idTipoMonedaCuota,
                     importe:formIngreso.importeCuota,
                     id_usuario:formIngreso.idUsuario
                 };
                 let array=[];
                 array.push(new repoIngreso().update(ingreso,formIngreso.Reserva));
                 array.push(new repoRegistroPago().insert(registroPago));
                 return Promise.all(array);

             }else{
                 return new Promise((resolve,reject)=>{
                     new repoIngreso().insertVenta(ingreso)
                         .then((result)=>{
                             registroPago.id_venta = result._id;
                             return new repoRegistroPago().insert(registroPago)
                         })
                         .then(()=>{resolve()})
                         .catch((err)=>{
                             reject(err)
                         })
                 })
             }
        }
    }
}

module.exports = IngresoServices;