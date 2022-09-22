import Usuario from '../models/usuario'
import Role from "../models/role";
import PetHouse from '../models/petHouse'
import Pet from '../models/pet'


export const esRoleValido = async (rol:string) => {

    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
    }
    
}


//Validar correo si existe
export const emailExiste = async( correo: string ) => {
    console.log("aqui");
    
    const existe = await Usuario.findOne({ correo })
    if( existe ) throw new Error (`El correo ${ correo } ya esta registrado por otro usuario`) 
}

//Validar usuario si no existe
export const existeUsuarioId = async( id: string ) => {
    
    const existe = await Usuario.findById( id )
    if( !existe ) throw new Error (`No existe el usuario con id : ${ id }.`) 
} 

//Validar pethouse si no existe
export const existePethouseId = async( id: string ) => {

    const existe = await PetHouse.findById( id )
    if( !existe ) throw new Error (`No existe la PetHouse con id : ${ id }.`);

}

//Validar mascota si no existe
export const existePetId = async( id: string ) => {

    const existe = await Pet.findById( id )
    if( !existe ) throw new Error (`No existe la Mascota con id : ${ id }.`);

}


