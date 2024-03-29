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
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const yargs_1 = __importDefault(require("yargs/yargs"));
//Yargs config
const argv = (0, yargs_1.default)(process.argv.slice(2)).options({
    dev: { type: 'boolean' }
}).parseSync();
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const { dev } = argv;
    const MONGO_URI = !!dev ? `${process.env.MONGODB_DEV}` : `${process.env.MONGODB_ATLAS}`;
    // console.log(MONGO_URI)
    try {
        yield mongoose_1.default.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        });
        console.log('Database connected...');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de datos');
    }
});
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map