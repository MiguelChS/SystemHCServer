/**
 * Created by mc185249 on 2/16/2017.
 */

let Login = require('../Services/LoginServices');
let DataSource = require('../Services/DataSourceService');
let Persona = require('../Services/PersonaServices');
let Units = require('../Services/UnitsServices');
let Venta = require('../Services/VentaService');
let Aporte = require('../Services/AporteService');

function Api(Router) {

    Router.post("/LoginServer",(req,res)=>{
        let usuario = req.body.username;
        let pass = req.body.pass;
        Login().validarUsuario(usuario,pass)
            .then((resultUser)=>{
                if(resultUser.length == 0){
                    res.status(200).json({entry:false});
                }else{
                    DataSource().getAll()
                        .then((resultSource)=>{
                            res.status(200).json({
                                entry:true,
                                DataUser:resultUser[0],
                                DataSource:resultSource
                            });
                        })
                        .catch((err)=> {
                            res.status(400).json({err:err});
                        })
                }
            })
            .catch((err)=>{
                res.status(400).json({err:err});
            });
    });

    Router.post('/NewSocio',(req,res)=>{
        Persona().newPersonWithUser(req.body)
            .then(()=>{
                res.status(200).send();
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                if(err.hasOwnProperty("code") && err.code == 11000){ mjsErr = "el numero de documento ya Existe"}
                res.status(400).json({err:mjsErr});
            });

    });

    Router.post('/newUnidad',(req,res)=>{
        Units().newUnits(req.body)
            .then(()=>{
                res.status(200).send();
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({err:mjsErr});
            });
    });

    Router.post('/newOwner',(req,res)=>{
        Persona().newPersonOnly(req.body)
            .then((result)=>{
                res.status(200).json({id:result});
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                if(err.hasOwnProperty("code") && err.code == 11000){ mjsErr = "el numero de documento ya Existe"}
                res.status(400).json({err:mjsErr});
            });
    });

    Router.post('/searchOwner',(req,res)=>{
        Persona().getPerson(req.body)
            .then((result)=>{
                res.status(200).json({result:result});
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({err:mjsErr});
            });
    });

    Router.post('/newSale',(req,res)=>{
        Venta().newIngreso(req.body)
            .then(()=>{
                res.status(200).json();
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                if(err.hasOwnProperty("code") && err.code == 11000){ mjsErr = "Esa unidad ya esta vendida"}
                res.status(400).json({err:mjsErr});
            });
    });

    Router.get('/searchUnits',(req,res)=>{
        Units().getUnits()
            .then((result)=>{
                res.status(200).json(result);
            })
            .catch(()=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({err:mjsErr});
            });
    });

    Router.post('/newAporte',(req,res)=>{
        Aporte().newAporte(req.body)
            .then(()=>{
                res.status(200).json();
            })
            .catch((err)=>{
                let mjsErr = "hay un problema en el servidor intente mas tarde";
                res.status(400).json({err:mjsErr});
            });
    });

    return Router;
}

module.exports = Api;