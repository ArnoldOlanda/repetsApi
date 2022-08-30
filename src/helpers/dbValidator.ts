import Usuario from '../models/usuario'


//Validar correo si existe
export const emailExiste = async( _correo: string )=>{
    
    // const existe = await Usuario.findOne({ correo })
    // if( existe ) throw new Error (`El correo ${ correo } ya esta registrado por otro usuario`) 
}

//Validar usuario si no existe
export const existeUsuarioId = async( id:number )=>{
    
    const existe = await Usuario.buscar( id )
    if( !existe ) throw new Error (`No existe el usuario con id : ${ id }.`) 
} 

// const existeGrupoId = async( id = '' )=>{
    
//     const existe = await Grupo.buscar( id )
//     if( !existe ) throw new Error (`No existe el grupo con id : ${ id }.`) 
// } 

