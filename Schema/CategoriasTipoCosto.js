/**
 * Created by mc185249 on 4/30/2017.
 */
let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let CategoriasTipoCostoSchema = new Schema({
    id_tipo_costo_parent:Schema.ObjectId,
    id_tipo_costo_children:Schema.ObjectId
},{collection:"CategoriasTipoCosto",versionKey: false});
let CategoriasTipoCosto = mongoose.model('CategoriasTipoCosto',CategoriasTipoCostoSchema);
module.exports = CategoriasTipoCosto;