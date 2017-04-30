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
}

module.exports = PersonaRepository;