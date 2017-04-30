/**
 * Created by mc185249 on 4/29/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let IngresoVentaSchema = new Schema({
    id_unidad:Schema.ObjectId,
    id_persona:Schema.ObjectId,
    id_estadoVenta:Schema.ObjectId,
    fechaVenta:Date,
    id_CondicionPago:Schema.ObjectId,
    cantidadPago:Number,
    id_tipoMoneda:Schema.ObjectId,
    importe:Number,
    id_tipoPago:Schema.ObjectId,
    id_usuario:Schema.ObjectId
},{collection:"IngresoVenta",versionKey: false});
let IngresoVenta = mongoose.model('IngresoVenta',IngresoVentaSchema);
module.exports = IngresoVenta;