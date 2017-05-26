let mongoose = require("mongoose");
mongoose.Promise = Promise;
let Schema = mongoose.Schema;
let newSchema = new Schema({
    fechaInicio: Date,
    plazo:Number,
    cambioDolar:Number,
    costoM2:Number,
    tasaRef:Number,
    DetalleControIngreso:[
        {
            fecha:Date,
            costo:Number,
            ingreso:Number
        }
    ]
},{collection:"IncioProyecto",versionKey: false});
let IncioProyecto = mongoose.model('IncioProyecto',newSchema);
module.exports = IncioProyecto;