/**
 * Created by mc185249 on 4/22/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let UsuariosSchema = new Schema({
    username:String,
    pass:String,
    id_persona:Schema.ObjectId,
    admin:Boolean
},{collection:"Usuarios",versionKey: false});
let usuario = mongoose.model('Usuarios',UsuariosSchema);
module.exports = usuario;