/**
 * Created by mc185249 on 4/24/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let PersonaSchema = new Schema({
    apellido:String,
    nombre:String,
    telefono:String,
    mail:String,
    id_TipoDocumento:Schema.ObjectId,
    numeroDocumento:String
},{collection:"Persona",versionKey: false});
let Persona = mongoose.model('Persona',PersonaSchema);
module.exports = Persona;