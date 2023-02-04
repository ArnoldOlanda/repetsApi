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
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cloudinary_1 = require("cloudinary");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const stripe_1 = __importDefault(require("stripe"));
const users_1 = __importDefault(require("../routes/users"));
const auth_1 = __importDefault(require("../routes/auth"));
const petHouses_1 = __importDefault(require("../routes/petHouses"));
const categorias_1 = __importDefault(require("../routes/categorias"));
const pets_1 = __importDefault(require("../routes/pets"));
const reservas_1 = __importDefault(require("../routes/reservas"));
const subscriptions_1 = __importDefault(require("../routes/subscriptions"));
const mensajes_1 = __importDefault(require("../routes/mensajes"));
const config_1 = require("../database/config");
const socketsController_1 = require("../sockets/socketsController");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 5000;
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.server);
        this.indexPath = '/api';
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        this.petHousePath = '/api/pethouses';
        this.categoriaPath = '/api/categorias';
        this.petsPath = '/api/pets';
        this.reservaPath = '/api/reserva';
        this.subscriptionPath = '/api/subscription';
        this.mensajesPath = '/api/mensajes';
        //Cloudinary config
        this.cloudinary = cloudinary_1.v2.config({
            cloud_name: `${process.env.CLOUDINARY_NAME}`,
            api_key: `${process.env.CLOUDINARY_API_KEY}`,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        //Stripe config
        this.stripe = new stripe_1.default('sk_test_51MR2e5DGlfAnj7PF1H5xf59VWQJXJT9JPyl7r3ISyYm6XqVzkAyu1HybfCgiH8aP4kAFnCqAKk0dvngAbUko2a4900A5GcmtEA', {
            apiVersion: '2022-11-15',
        });
        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Routes
        this.routes();
        //Sockets
        this.sockets();
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
        this.app.use((0, morgan_1.default)('short'));
        //Carga de archivos - imagenes
        this.app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }
    routes() {
        this.app.get(this.indexPath, (_, res) => {
            res.json({ msg: "re-pets api - conected" });
        });
        this.app.post(`${this.indexPath}/payment-intent`, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { amount, currency } = req.body;
                const paymentIntent = yield this.stripe.paymentIntents.create({
                    amount,
                    currency,
                });
                res.json({
                    ok: true,
                    clientSecret: paymentIntent.client_secret
                });
            }
            catch (error) {
                console.log(error);
                res.json({
                    ok: 'false',
                    msg: error
                });
            }
        }));
        this.app.use(this.userPaths, users_1.default);
        this.app.use(this.authPath, auth_1.default);
        this.app.use(this.petHousePath, petHouses_1.default);
        this.app.use(this.categoriaPath, categorias_1.default);
        this.app.use(this.petsPath, pets_1.default);
        this.app.use(this.reservaPath, reservas_1.default);
        this.app.use(this.subscriptionPath, subscriptions_1.default);
        this.app.use(this.mensajesPath, mensajes_1.default);
    }
    sockets() {
        this.io.on("connection", socketsController_1.socketsController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server on line in the port: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map