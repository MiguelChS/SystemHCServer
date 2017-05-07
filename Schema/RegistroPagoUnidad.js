/**
 * Created by mc185249 on 5/6/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let newSchema = new Schema({
    id_venta:Schema.ObjectId,
    importe:Number,
    id_tipoPago:Schema.ObjectId,
    fecha:Date,
    id_tipoMoneda:Schema.ObjectId,
    id_formaPago:Schema.ObjectId,
    id_usuario:Schema.ObjectId
},{collection:"RegistroPagoUnidad",versionKey: false});
let RegistroPagoUnidad = mongoose.model('RegistroPagoUnidad',newSchema);
module.exports = RegistroPagoUnidad;