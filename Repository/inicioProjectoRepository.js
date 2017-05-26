/**
 * Created by mc185249 on 5/25/2017.
 */
let inicioProyecto = require("../Schema/InicioProjecto");

function inicioProyectoRepository() {
    this.insert =(formulario) =>{
        return new inicioProyecto(formulario).save();
    };
    this.update =(fomulario,id)=>{
        return inicioProyecto.update({_id:id},fomulario)
    };
    this.get =()=>{
        return inicioProyecto.findOne();
    }
}

module.exports = inicioProyectoRepository;