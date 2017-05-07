/**
 * Created by mc185249 on 5/1/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let CostosSocioSchema = new Schema({
    importe:Number,
    id_tipoMoneda:Schema.ObjectId,
    id_formaPago:Schema.ObjectId,
    id_tipoCosto:Schema.ObjectId,
    fecha:Date,
    id_usuario:Schema.ObjectId
},{collection:"Costos",versionKey: false});
let Costos = mongoose.model('Costos',CostosSocioSchema);
module.exports = Costos;