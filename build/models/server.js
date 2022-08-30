"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("../routes/users"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 5000;
        this.indexPath = '/api';
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
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
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on line in the port: ${this.port}`);
        });
    }
}
exports.default = Server;
