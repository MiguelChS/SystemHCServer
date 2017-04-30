/**
 * Created by mc185249 on 4/24/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let UnidadesSchema = new Schema({
    piso:String,
    unidad:String,
    id_orientacion:Schema.ObjectId,
    caracteristicas:String,
    superficieCubierta:Number,
    Balcon_terraza:Number,
    terraza_externa:Number
},{collection:"Unidades",versionKey: false});
let Unidades = mongoose.model('Unidades',UnidadesSchema);
module.exports = Unidades;