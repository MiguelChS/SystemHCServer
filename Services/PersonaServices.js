/**
 * Created by mc185249 on 4/23/2017.
 */
let moment = require("moment");
let repoPerson = require('../Repository/PersonaRepository');
let repoUser = require('../Repository/UsuarioRepository');
let repoAporte = require('../Repository/AporteSocioRepository');
let repoUnits = require("../Repository/UnidadesRepository");
let repoRegistroPago = require("../Repository/RegistroPagoUnidadRepository");
function PersonServices() {
    return {
        'newPersonWithUser':(formPerson)=>{
            let newPerson = {
                apellido:formPerson.name,
                nombre:formPerson.lastName,
                telefono:formPerson.phone,
                mail:formPerson.mail,
                id_TipoDocumento:formPerson.typeDocument,
                numeroDocumento:formPerson.numberDocument
            };
            let newUser = {
                username:formPerson.numberDocument,
                pass:formPerson.numberDocument,
                id_persona:"",
                admin:false
            };
            if(formPerson.id){
                return new repoPerson().update(formPerson.id,newPerson)
            }else{
                return new repoPerson().insert(newPerson)
                    .then((idPerson)=>{
                        newUser.id_persona = idPerson._id;
                        return Promise.all([
                            new repoUser().insert(newUser)
                        ]);
                    })
            }
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
            switch (param.socio){
                case 1:{
                    return new repoPerson().getPersonSocio(param.numberDocument)
                }
                case 2:{
                    return new Promise((resolve,reject)=>{
                        new repoPerson().getPerson(param.numberDocument)
                            .then((result)=>{
                                if(result.length == 0) resolve(result);
                                let persona = result[0];
                                persona.unidades = persona.unidades.filter( obj => obj.cantidadPago  == null);
                                var arrayPromise = [];
                                persona.unidades.map((obj)=>{
                                    arrayPromise.push(new repoUnits().getUnitById(obj.unidad));
                                    arrayPromise.push(new repoRegistroPago().getByIdVenta(obj.reserva))
                                });
                                Promise.all(arrayPromise)
                                    .then((resulUnitReg)=>{
                                        resulUnitReg.map((obj)=>{
                                            obj = obj[0];
                                            if(obj.hasOwnProperty("id_venta")){
                                                for (let i = 0; i < persona.unidades.length ; i++){
                                                    if(persona.unidades[i].reserva.toString() == obj.id_venta.toString()){
                                                        persona.unidades[i]["reserva"] = obj;
                                                    }
                                                }
                                            }else{
                                                for (let i = 0; i < persona.unidades.length ; i++){
                                                    if(persona.unidades[i].unidad.toString() == obj.value.toString()){
                                                        persona.unidades[i]["unidad"] = obj;
                                                    }
                                                }
                                            }
                                        });
                                        resolve([persona]);
                                    })
                                    .catch((err)=>{
                                        reject(err);
                                    });
                            })
                            .catch((err)=>{
                                reject(err);
                            })
                    })
                }
                case 3:{
                    return new Promise((resolve,reject)=>{
                        new repoPerson().getPerson(param.numberDocument)
                            .then((result)=>{
                                if(result.length == 0) resolve(result);
                                let persona = result[0];
                                persona.unidades = persona.unidades.filter( obj => obj.cantidadPago  != null);
                                var arrayPromise = [];
                                persona.unidades.map((obj)=>{
                                    arrayPromise.push(new repoUnits().getUnitById(obj.unidad));
                                });
                                Promise.all(arrayPromise)
                                    .then((resulUnitReg)=>{
                                        resulUnitReg.map((obj)=>{
                                            obj = obj[0];
                                            for (let i = 0; i < persona.unidades.length ; i++){
                                                if(persona.unidades[i].unidad.toString() == obj.value.toString()){
                                                    persona.unidades[i]["unidad"] = obj;
                                                }
                                            }
                                        });
                                        resolve([persona]);
                                    })
                                    .catch((err)=>{
                                        reject(err);
                                    });
                            })
                            .catch((err)=>{
                                reject(err);
                            })
                    })
                }
            }
        },

        'getSocioAll':()=>{
            return new repoPerson().getAllSocio();
        }
    }
}

module.exports = PersonServices;