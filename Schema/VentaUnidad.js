/**
 * Created by mc185249 on 4/29/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let VentaUnidadSchema = new Schema({
    id_unidad:Schema.ObjectId,
    id_persona:Schema.ObjectId,
    id_estadoVenta:Schema.ObjectId,
    fechaVenta:Date,
    cantidadPago:Number,
    id_tipoMoneda:Schema.ObjectId,
    importe:Number,
    id_usuario:Schema.ObjectId
},{collection:"VentaUnidad",versionKey: false});
let VentaUnidad = mongoose.model('VentaUnidad',VentaUnidadSchema);
module.exports = VentaUnidad;