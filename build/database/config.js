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
exports.query = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
//Production
// const configProduction = {
//     host:"us-cdbr-east-05.cleardb.net",
//     user:"b6f9ccb0065180",
//     database:"heroku_fa1f6c8f445bc02",
//     password:"c8217cf3",
//     multipleStatements: true
// }
//Development
const config = {
    host: "localhost",
    user: "root",
    database: "repets",
    password: "admin",
    multipleStatements: true
};
const query = (queryString = "select 1 + 1 ") => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield promise_1.default.createConnection(config);
    const [rows] = yield connection.execute(queryString);
    connection.end();
    return rows;
});
exports.query = query;
