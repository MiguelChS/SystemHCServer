/**
 * Created by mc185249 on 5/25/2017.
 */
let repoProyecto = require('../Repository/inicioProjectoRepository');
function UnitsServices() {
    return {
        'dataIncioProject':(fomulario)=>{
            if(fomulario.id){
                //actulizamo
                let id = fomulario.id;
                delete fomulario.id;
                return new repoProyecto().update(fomulario,id);
            }else{
                //insertamos
                delete fomulario.id;
                return new repoProyecto().insert(fomulario);
            }
        },
        'getProject':()=>{
            return new repoProyecto().get();
        }
    }
}

module.exports = UnitsServices;