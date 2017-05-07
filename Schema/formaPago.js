/**
 * Created by mc185249 on 4/25/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let newSchema = new Schema({
    description:String
},{collection:"formaPago",versionKey: false});
let formaPago = mongoose.model('formaPago',newSchema);
module.exports = formaPago;