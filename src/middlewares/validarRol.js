const { request, response } = require("express");


const esAdminRol = ( req = request, res = response, next ) =>{

    if ( !req.autenthicatedUser ) {
        return res.status(500).json({
            msg: 'Se intenta validar el rol sin haber valido primeramente el token del usuario'
        })
    }

    const { rol, nombre } = req.autenthicatedUser

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg:`${ nombre } no es administrador - no puede realizar esta operacion`
        })
    }
    next();
}

const tieneRole = ( ...roles ) =>{
    return( req, res, next ) =>{
        // console.log(roles,req.autenthicatedUser.rol);
        if ( !req.autenthicatedUser ) {
            return res.status(500).json({
                msg: 'Se intenta validar el rol sin haber valido primeramente el token del usuario'
            })
        }

        if ( !roles.includes( req.autenthicatedUser.rol ) ) {
            return res.status(401).json({
                msg:`El servicio require uno de estos roles ${ roles }`
            })
        }

        next();
    }
}

module.exports={
    esAdminRol,
    tieneRole
}