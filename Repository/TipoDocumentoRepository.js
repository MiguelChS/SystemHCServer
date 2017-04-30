/**
 * Created by mc185249 on 4/23/2017.
 */
let typeDocument = require("../Schema/TipoDocumento");

function typeDocumentRepository() {
    this.getTypeDocument = ()=>{
        return new Promise((resolve,reject)=>{
            typeDocument.aggregate([
                {$project:
                    {
                        _id:0,
                        "value":"$_id",
                        "label":"$descripcion"
                    }
                }
            ]).then((result)=>{
                resolve({typeDocument:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = typeDocumentRepository;