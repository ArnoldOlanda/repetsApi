import {query} from '../database/config'

export default class {
    static async registrar(_data = {}){
        try {
            //const {nombre, usuario, password_, idDireccion} = data
            const rows = await query()

            return rows
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(){
        try {
            const rows = await query()
            // const rows = await query("select * from usuario")

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