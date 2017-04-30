let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let CondicionPagoSchema = new Schema({
    description:String
},{collection:"CondicionPago",versionKey: false});
let CondicionPago = mongoose.model('CondicionPago',CondicionPagoSchema);
module.exports = CondicionPago;