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
exports.actualizarEstadoReserva = exports.registrarReserva = exports.obtenerReserva = exports.listadoReservas = void 0;
const reserva_1 = __importDefault(require("../models/reserva"));
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
    try {
        const newReserva = new reserva_1.default(body);
        const savedReserva = yield newReserva.save();
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