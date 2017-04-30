/**
 * Created by mc185249 on 4/25/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let EstadoVentaSchema = new Schema({
    description:String
},{collection:"EstadoVenta",versionKey: false});
let EstadoVenta = mongoose.model('EstadoVenta',EstadoVentaSchema);
module.exports = EstadoVenta;