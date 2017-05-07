/**
 * Created by mc185249 on 4/30/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let TipoCostoSchema = new Schema({
    description:String
},{collection:"TipoCosto",versionKey: false});
let TipoCosto = mongoose.model('TipoCosto',TipoCostoSchema);
module.exports = TipoCosto;