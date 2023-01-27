"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.actualizarEstadoReserva = exports.registrarReserva = exports.obtenerReserva = exports.listadoReservas = void 0;
const admin = __importStar(require("firebase-admin"));
const reserva_1 = __importDefault(require("../models/reserva"));
const petHouse_1 = __importDefault(require("../models/petHouse"));
const usuario_1 = __importDefault(require("../models/usuario"));
const listadoReservas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservas = yield reserva_1.default.find();
        return res.json({
            data: reservas
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrion un error"
        });
    }
});
exports.listadoReservas = listadoReservas;
const obtenerReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reserva = yield reserva_1.default.findById(id)
            .populate('usuario', { nombre: 1, apellido: 1 })
            .populate('pethouse', { nombre: 1 });
        return res.json({
            data: reserva
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrion un error"
        });
    }
});
exports.obtenerReserva = obtenerReserva;
const registrarReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { pethouse } = body;
    try {
        const usuarioPethouse = yield petHouse_1.default.findById(pethouse);
        const propietario = yield usuario_1.default.findById(usuarioPethouse === null || usuarioPethouse === void 0 ? void 0 : usuarioPethouse.propietario);
        const newReserva = new reserva_1.default(body);
        const savedReserva = yield newReserva.save();
        // const { payment_intent_token, ...savedReservaWithOuthPaymentToken} = savedReserva.toJSON();
        const reservaData = {
            fecha_reserva: savedReserva.fecha_reserva.toLocaleDateString(),
            fecha_solicitud: savedReserva.fecha_solicitud.toLocaleDateString(),
            duracion_dias: String(savedReserva.duracion_dias),
            duracion_horas: String(savedReserva.duracion_horas),
            usuario: String(savedReserva.usuario),
            pethouse: String(savedReserva.pethouse),
            mascota: String(savedReserva.mascota),
            costo_total: String(savedReserva.costo_total),
            metodo_pago: String(savedReserva.metodo_pago),
            estado: String(savedReserva.estado),
            tipo: 'notificacion_reserva'
        };
        if (propietario) {
            const message = {
                notification: {
                    body: "Tienes una nueva solicitud de reserva, revisa los mensajes",
                    title: "Nueva solicitud de reserva",
                },
                data: reservaData,
                apns: {
                    payload: { aps: { 'mutable-content': 1 } },
                    fcm_options: { image: 'image-url' },
                },
                android: { notification: { image: 'image-url' } },
                token: propietario.notification_token
            };
            yield admin.messaging()
                //@ts-ignore
                .send(message)
                .then(_response => {
                console.log("Notificacion enviada");
            })
                .catch(console.log);
        }
        return res.json({
            data: savedReserva
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrion un error"
        });
    }
});
exports.registrarReserva = registrarReserva;
const actualizarEstadoReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const reserva = yield reserva_1.default.findByIdAndUpdate(id, { estado });
        if (reserva) {
            const saved = yield reserva.save();
            return res.json({
                data: saved
            });
        }
        return res.json({
            msg: "No se encontro la reserva"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrion un error"
        });
    }
});
exports.actualizarEstadoReserva = actualizarEstadoReserva;
//# sourceMappingURL=reservas.js.map