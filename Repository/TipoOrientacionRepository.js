/**
 * Created by mc185249 on 4/24/2017.
 */
let typeOrientation = require("../Schema/TipoOrientacion");

function typeOrientationRepository() {
    this.getTypeOrientation =()=>{
        return new Promise((resolve,reject)=>{
            typeOrientation.aggregate([
                {$project:
                {
                    _id:0,
                    "value":"$_id",
                    "label":"$descripcion"
                }
                }
            ]).then((result)=>{
                resolve({typeOrientation:result})
            })
                .catch((err)=>{
                    reject(err)
                })
        })
    }
}

module.exports = typeOrientationRepository;