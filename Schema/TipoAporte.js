/**
 * Created by mc185249 on 4/29/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let TipoAporteSchema = new Schema({
    description:String
},{collection:"TipoAporte",versionKey: false});
let TipoAporte = mongoose.model('TipoAporte',TipoAporteSchema);
module.exports = TipoAporte;