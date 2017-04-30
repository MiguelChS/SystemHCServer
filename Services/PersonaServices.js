/**
 * Created by mc185249 on 4/23/2017.
 */
let repoPerson = require('../Repository/PersonaRepository');
let repoUser = require('../Repository/UsuarioRepository');
function PersonServices() {
    return {
        'newPersonWithUser':(formPerson)=>{
            return new Promise((resolve,reject)=>{
                //validar
                let newPerson = {
                    apellido:formPerson.name,
                    nombre:formPerson.lastName,
                    telefono:formPerson.phone,
                    mail:formPerson.mail,
                    id_TipoDocumento:formPerson.typeDocument,
                    numeroDocumento:formPerson.numberDocument
                };
                new repoPerson().insert(newPerson)
                    .then((idPartner)=>{ return new repoUser().insert({
                        username:formPerson.numberDocument,
                        pass:formPerson.numberDocument,
                        id_socio:idPartner._id,
                        admin:false
                    })})
                    .then(()=>{resolve();})
                    .catch((err)=>{
                        reject(err);
                    });
            })
        },
        'newPersonOnly':(formOwner)=>{
            return new Promise((resolve,reject)=>{
                //validar
                let newOwner = {
                    apellido:formOwner.name,
                    nombre:formOwner.lastName,
                    telefono:formOwner.phone,
                    mail:formOwner.mail,
                    id_TipoDocumento:formOwner.typeDocument,
                    numeroDocumento:formOwner.numberDocument
                };
                new repoPerson().insert(newOwner)
                    .then((result)=>{
                        resolve(result._id)
                    })
                    .catch((err)=>{
                        reject(err);
                    })
            })
        },
        'getPerson':(param)=>{
            if(param.socio){
                return new repoPerson().getPersonSocio(param.numberDocument)
            }else{
                return new repoPerson().getPerson(param.numberDocument)
            }

        }
    }
}

module.exports = PersonServices;