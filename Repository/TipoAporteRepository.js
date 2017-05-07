/**
 * Created by mc185249 on 4/29/2017.
 */
let typeAporte = require("../Schema/TipoAporte");

function typeContributeRepository() {
    this.getTypeContribute = ()=>{
        return new Promise((resolve,reject)=>{
            typeAporte.aggregate([
                {$project:
                {
                    _id:0,
                    "value":"$_id",
                    "label":"$descripcion"
                }
                }
            ]).then((result)=>{
                resolve({typeContribute:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = typeContributeRepository;