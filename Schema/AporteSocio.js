/**
 * Created by mc185249 on 4/29/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let AporteSocioSchema = new Schema({
    importe:Number,
    id_tipoMoneda:Schema.ObjectId,
    id_persona:Schema.ObjectId,
    id_tipoAporte:Schema.ObjectId,
    fecha:Date,
    id_usuario:Schema.ObjectId
},{collection:"AporteSocio",versionKey: false});
let AporteSocio = mongoose.model('AporteSocio',AporteSocioSchema);
module.exports = AporteSocio;