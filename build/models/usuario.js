"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../database/config");
class default_1 {
    static registrar(_data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const {nombre, usuario, password_, idDireccion} = data
                const rows = yield (0, config_1.query)();
                return rows;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    static listar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, config_1.query)();
                // const rows = await query("select * from usuario")
                return rows;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
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
    static eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, config_1.query)(`update usuario set estado=0 where id=${id}`);
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
    static buscar(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const [ usuario ] = await query(`select id,nombre_completo from usuario where id=${ id }`);
                //return usuario
                return;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.default = default_1;
