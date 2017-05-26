/**
 * Created by mc185249 on 4/24/2017.
 */
let repoUnits = require('../Repository/UnidadesRepository');
function UnitsServices() {
    return {
        'newUnits':(formUnits)=>{
            let newUnits = {
                piso:formUnits.piso,
                unidad:formUnits.unidad,
                id_orientacion:formUnits.idOrientacion,
                caracteristicas:formUnits.caracteristicas,
                superficieCubierta:formUnits.superficieCubierta,
                Balcon_terraza:formUnits.balconTerraza,
                terraza_externa:formUnits.terrrazaExterna
            };
            if(formUnits.id){
                return new repoUnits().update(formUnits.id,newUnits);
            }else{
                return new repoUnits().insert(newUnits);
            }
        },
        'getUnits':()=>{
            return new repoUnits().getUnits()
        },
        'getAllUnidades':()=>{
            return new repoUnits().getAllUnidades();
        },
        'DeleteUnits':(id)=>{
            return new repoUnits().delete(id);
        }

    }
}

module.exports = UnitsServices;