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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("../routes/users"));
const auth_1 = __importDefault(require("../routes/auth"));
const petHouses_1 = __importDefault(require("../routes/petHouses"));
const categorias_1 = __importDefault(require("../routes/categorias"));
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 5000;
        this.indexPath = '/api';
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        this.petHousePath = '/api/petHouses';
        this.categoriaPath = '/api/categorias';
        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
    }
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConnection)();
        });
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        //Public folder
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.get(this.indexPath, (_, res) => {
            res.json({ msg: "re-pets api - conected" });
        });
        this.app.use(this.userPaths, users_1.default);
        this.app.use(this.authPath, auth_1.default);
        this.app.use(this.petHousePath, petHouses_1.default);
        this.app.use(this.categoriaPath, categorias_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on line in the port: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map