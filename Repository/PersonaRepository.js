/**
 * Created by mc185249 on 4/24/2017.
 */
let Persona = require("../Schema/Persona");

function PersonaRepository() {
    this.getPerson =(numberDocument)=>{
        return Persona.aggregate([
            {$match:{numeroDocumento:numberDocument}},
            {$lookup:
            {
                from:"TipoDocumento",
                localField:"id_TipoDocumento",
                foreignField:"_id",
                as:"TipoDocumento"
            }
            },
            {$unwind: '$TipoDocumento'},
            {$lookup:
            {
                from:"VentaUnidad",
                localField:"_id",
                foreignField:"id_persona",
                as:"unidades"
            }
            },
            {$project:
            {
                _id:0,
                "id":"$_id",
                "lastName":"$apellido",
                "name":"$nombre",
                "phone":"$telefono",
                "mail":1,
                "numberDocument":"$numeroDocumento",
                "typeDocument":"$TipoDocumento.descripcion",
                unidades:{
                    $map:{
                        input:"$unidades",
                        as:"item",
                        in:{
                            "unidad":"$$item.id_unidad",
                            "reserva":"$$item._id",
                            "cantidadPago": "$$item.cantidadPago"
                        }
                    }
                }
            }
            }
        ])
    };
    this.getPersonSocio =(numberDocument)=>{
        return Persona.aggregate([
            {$match:{numeroDocumento:numberDocument}},
            {$lookup:
            {
                from:"Usuarios",
                localField:"_id",
                foreignField:"id_persona",
                as:"usuario"
            }
            },
            {$match:{"usuario": { $size: 1}}},
            {$lookup:
            {
                from:"TipoDocumento",
                localField:"id_TipoDocumento",
                foreignField:"_id",
                as:"TipoDocumento"
            }
            },
            {$unwind: '$TipoDocumento'},
            {$project:
            {
                _id:0,
                "id":"$_id",
                "lastName":"$apellido",
                "name":"$nombre",
                "phone":"$telefono",
                "mail":1,
                "numberDocument":"$numeroDocumento",
                "typeDocument":"$TipoDocumento.descripcion"
            }
            }
        ])
    };
    this.insert =(newPerson) =>{
        return new Persona(newPerson).save();
    };
    this.update = (id,form)=>{
        return Persona.update({_id:id},form);
    }
    this.getAllSocio = ()=>{
        return Persona.aggregate([
            {$lookup:{
                from:"TipoDocumento",
                localField:"id_TipoDocumento",
                foreignField:"_id",
                as:"TipoDocu"
            }},
            {$unwind: '$TipoDocu'},
            {$lookup:{
                from:"Usuarios",
                localField:"_id",
                foreignField:"id_persona",
                as:"usuario"
            }},
            {$lookup:{
                from:"VentaUnidad",
                localField:"_id",
                foreignField:"id_persona",
                as:"compras"
            }},
            {$project:{
                _id:1,
                apellido:1,
                nombre:1,
                telefono:1,
                mail:1,
                numeroDocumento:1,
                "tipoDocu":"$TipoDocu.descripcion",
                socio:{$cond: { if: { $eq: [ {$size:"$usuario"}, 0 ]}, then: false, else: true }},
                cantUnits:{$size:"$compras"}
            }},
            {$match:{socio:true}}
        ])
    }
}

module.exports = PersonaRepository;