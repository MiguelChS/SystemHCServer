/**
 * Created by mc185249 on 4/22/2017.
 */
let repoUsuario = require('../Repository/UsuarioRepository');
function LoginServices() {
    return {
        'validarUsuario':(usuario,pass)=>{
            return new repoUsuario().getUsuario(usuario,pass);
        }
    }
}

module.exports = LoginServices;