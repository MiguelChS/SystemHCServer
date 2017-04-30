let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let TipoMonedaSchema = new Schema({
    description:String
},{collection:"TipoMoneda",versionKey: false});
let TipoMoneda = mongoose.model('TipoMoneda',TipoMonedaSchema);
module.exports = TipoMoneda;