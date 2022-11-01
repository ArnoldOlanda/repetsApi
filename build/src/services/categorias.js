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
exports.deactivate = exports.activate = exports.putCategoria = exports.postCategoria = exports.getCategoria = void 0;
const categoria_1 = __importDefault(require("../models/categoria"));
const getCategoria = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield categoria_1.default.find();
        return res.json({
            data
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getCategoria = getCategoria;
const postCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        const categoria = new categoria_1.default({ categoria: nombre });
        yield categoria.save();
        return res.json({
            msg: "Categoria registrada",
            categoria
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrio un error al registrar la categoria, consulte con el administrador"
        });
    }
});
exports.postCategoria = postCategoria;
const putCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const categoria = yield categoria_1.default.findByIdAndUpdate(id, { categoria: nombre });
        return res.json({
            msg: "Categoria actualizada",
            categoria
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrio un error al actualizar la categoria, consulte con el administrador"
        });
    }
});
exports.putCategoria = putCategoria;
const activate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoria = yield categoria_1.default.findByIdAndUpdate(id, { estado: true });
        return res.json({
            msg: "Categoria activada",
            categoria
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrio un error al actualizar la categoria, consulte con el administrador"
        });
    }
});
exports.activate = activate;
const deactivate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoria = yield categoria_1.default.findByIdAndUpdate(id, { estado: false });
        return res.json({
            msg: "Categoria activada",
            categoria
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Ocurrio un error al actualizar la categoria, consulte con el administrador"
        });
    }
});
exports.deactivate = deactivate;
//# sourceMappingURL=categorias.js.map