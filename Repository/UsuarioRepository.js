let usuario = require("../Schema/Usuarios");

function UsuarioRepository() {
    this.getUsuario =(username,pass)=>{
        return usuario.aggregate([
            {$match:{username:username,pass:pass}},
            {$lookup:
            {
                from:"Persona",
                localField:"id_persona",
                foreignField:"_id",
                as:"persona"
            }
            },
            {$unwind: '$persona'},
            {$project:
            {
                _id:0,
                "id":"$_id",
                "name":"$persona.nombre",
                "lastName":"$persona.apellido",
                admin:1
            }
            }
        ])
    };

    this.insert =(newUser) =>{
        return new usuario(newUser).save();
    };

}

module.exports = UsuarioRepository;