/**
 * Created by mc185249 on 4/24/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let TipoOrientacionSchema = new Schema({
    description:String
},{collection:"TipoOrientacion",versionKey: false});
let TipoOrientacion = mongoose.model('TipoOrientacion',TipoOrientacionSchema);
module.exports = TipoOrientacion;