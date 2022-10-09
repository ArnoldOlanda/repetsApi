"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const uploadFiles = (req, extensionesValidas = ['png', 'jpg', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        if (req.files) {
            const image = req.files.image;
            const nombreCortado = image.name.split('.');
            const extension = nombreCortado[nombreCortado.length - 1];
            if (!extensionesValidas.includes(extension)) {
                return reject(`La extension ${extension} no es permitida - [${extensionesValidas}]`);
            }
            const nombreTemp = (0, uuid_1.v4)() + '.' + extension;
            const uploadPath = path_1.default.join(__dirname, '../../uploads/', carpeta, nombreTemp);
            image.mv(uploadPath, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(nombreTemp);
            });
            return;
        }
    });
};
exports.uploadFiles = uploadFiles;
//# sourceMappingURL=uploadFiles.js.map