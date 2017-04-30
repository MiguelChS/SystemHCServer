/**
 * Created by mc185249 on 4/23/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let TipoDocumentoSchema = new Schema({
    description:String
},{collection:"TipoDocumento",versionKey: false});
let TipoDocumento = mongoose.model('TipoDocumento',TipoDocumentoSchema);
module.exports = TipoDocumento;