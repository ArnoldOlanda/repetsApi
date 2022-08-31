import {query} from '../database/config'
import { UsuarioDef, VerifyAccountDef } from '../types';

export default class {
    static async registrar(data: UsuarioDef){
        try {
            
            const {nombre, apellido, celular, email, password, google, rol} = data
            
            const rows = await query(`
                insert into usuario(nombre,apellido,celular,email,password,google,id_rol)
                values(
                    "${ nombre }",
                    "${ apellido }",
                    "${ celular }", 
                    "${ email }", 
                    "${ password }", 
                    ${ google },
                    ${ rol }
                )`
            );

            return rows
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async verificarCuenta( data: VerifyAccountDef ) {
        try {
            const {id, verified } = data

            const rows = await query(`
                update usuario set verificado = ${ Number( verified ) } where
                id=${ id }
            `)

            return rows
        } catch (error) {
            
            throw error
                        
        }
    }

    static async listar(){
        try {
            
            const rows = await query("select * from usuario")

            return rows
        } catch (error) {
            console.log(error);
            throw error   
        }
    }


    // static async actualizarNotificacionToken(id, token){
    //     try {
    //         const rows = await query(`update usuario set notif_token="${ token }" where id=${id}`);
    //         return rows
    //     } catch (error) {
    //         console.log(error);
    //         throw error  
    //     }
    // }

    // static async actualizar(data={}){
    //     try {
    //         const {} = data
    //     } catch (error) {
            
    //     }
    // }

    static async eliminar(id:string){
        try {
            await query(`update usuario set estado=0 where id=${ id }`)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async buscar(_id:number){
        try {
            //const [ usuario ] = await query(`select id,nombre_completo from usuario where id=${ id }`);
            //return usuario
            return
        } catch (error) {
            console.log(error);
            return false
        }
    }


}