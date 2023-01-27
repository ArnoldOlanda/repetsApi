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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePetHouse = exports.putPetHouse = exports.updateGalleryPetHouse = exports.postPetHouse = exports.getPetHouseOne = exports.getPetHouse = void 0;
const cloudinary_1 = require("cloudinary");
const petHouse_1 = __importDefault(require("../models/petHouse"));
const usuario_1 = __importDefault(require("../models/usuario"));
const subscription_1 = __importDefault(require("../models/subscription"));
const moment_1 = __importDefault(require("moment"));
const calculateRemainingSubscriptionDays_1 = require("../helpers/calculateRemainingSubscriptionDays");
// Lista de pethouses
const getPetHouse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield petHouse_1.default.find()
            .populate('tipo_mascotas', { categoria: 1 })
            .populate('propietario', { nombre: 1, apellido: 1 });
        return res.json({
            data
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getPetHouse = getPetHouse;
const getPetHouseOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    try {
        const pethouse = yield petHouse_1.default.findById(uid)
            .populate('tipo_mascotas', { categoria: 1 })
            .populate('propietario', { nombre: 1, apellido: 1 })
            .populate('pethouse', { nombre: 1 });
        return res.json({
            pethouse
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.getPetHouseOne = getPetHouseOne;
// Registrar nueva pethouse
const postPetHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { subscriptionData } = _a, data = __rest(_a, ["subscriptionData"]);
        const pethouse = new petHouse_1.default(data);
        const savedPethouse = yield pethouse.save();
        const user = yield usuario_1.default.findById(savedPethouse.propietario);
        if (user) {
            user.pethouse = savedPethouse.id;
            yield user.save();
        }
        const renovation_date = (0, moment_1.default)(new Date(subscriptionData.subscription_date)).add(1, 'M').toDate();
        const subscriptionDateToSave = Object.assign(Object.assign({}, subscriptionData), { renew_subscription_date: subscriptionData.subscription_date, subscription_end_date: renovation_date });
        const subscription = new subscription_1.default(subscriptionDateToSave);
        const savedSubscription = yield subscription.save();
        // const now: Moment = moment(new Date(savedSubscription.subscription_date));
        // const subscriptionEndDate: Moment = moment(new Date(savedSubscription.subscription_end_date));
        const remainingDays = (0, calculateRemainingSubscriptionDays_1.remainingSubscriptionDays)(savedSubscription.subscription_date, savedSubscription.subscription_end_date);
        return res.json({
            msg: "PetHouse registrada",
            pethouse,
            savedSubscription,
            remainingDays
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al registrar, hable con el administrador"
        });
    }
});
exports.postPetHouse = postPetHouse;
const updateGalleryPetHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({ msg: 'No hay imagen para subir.' });
            return;
        }
        const pethouse = yield petHouse_1.default.findById(id);
        if (pethouse) {
            //TODO: eliminar las fotos de la pethouse antiguas
            const image1 = req.files.image1;
            const image2 = req.files.image2;
            const image3 = req.files.image3;
            const paths = [];
            const secure_urls = [];
            image1 && paths.push(image1.tempFilePath);
            image2 && paths.push(image2.tempFilePath);
            image3 && paths.push(image3.tempFilePath);
            const response = yield Promise.all(paths.map((e) => __awaiter(void 0, void 0, void 0, function* () {
                return (yield cloudinary_1.v2.uploader.upload(e, { folder: 'repets-app/pethouses' }));
            })));
            for (const element of response) {
                secure_urls.push(element.secure_url);
            }
            pethouse.galeria = pethouse.galeria.concat(secure_urls);
            const updatedPethouse = yield pethouse.save();
            return res.json({
                pethouse: updatedPethouse
            });
        }
        return res.status(400).json({
            err: 'No existe la pethouse'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            err: 'Ocurrio un error'
        });
    }
});
exports.updateGalleryPetHouse = updateGalleryPetHouse;
const putPetHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const petHouse = yield petHouse_1.default.findByIdAndUpdate(id, data);
        return res.json({
            msg: "PetHouse actualizada",
            petHouse,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        });
    }
});
exports.putPetHouse = putPetHouse;
const deletePetHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield petHouse_1.default.findByIdAndUpdate(id, { estado: false });
        return res.json({
            msg: "PetHouse eliminada"
        });
    }
    catch (error) {
        return res.status(400).json({
            err: "Error al eliminar, hable con el administrador"
        });
    }
});
exports.deletePetHouse = deletePetHouse;
//# sourceMappingURL=petHouses.js.map