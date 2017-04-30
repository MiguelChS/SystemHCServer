/**
 * Created by mc185249 on 4/25/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let newSchema = new Schema({
    description:String
},{collection:"TipoPago",versionKey: false});
let TipoPago = mongoose.model('TipoPago',newSchema);
module.exports = TipoPago;