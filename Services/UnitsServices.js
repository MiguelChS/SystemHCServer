/**
 * Created by mc185249 on 4/24/2017.
 */
let repoUnits = require('../Repository/UnidadesRepository');
function UnitsServices() {
    return {
        'newUnits':(formUnits)=>{
            return new Promise((resolve,reject)=>{
                //validar
                let newUnits = {
                    piso:formUnits.piso,
                    unidad:formUnits.unidad,
                    id_orientacion:formUnits.idOrientacion,
                    caracteristicas:formUnits.caracteristicas,
                    superficieCubierta:formUnits.superficieCubierta,
                    Balcon_terraza:formUnits.balconTerraza,
                    terraza_externa:formUnits.terrrazaExterna
                };
                new repoUnits().insert(newUnits)
                    .then(()=>{resolve()})
                    .catch((err)=>{
                        reject(err);
                    });
            })
        },
        'getUnits':()=>{
            return new repoUnits().getUnits()
        }
    }
}

module.exports = UnitsServices;