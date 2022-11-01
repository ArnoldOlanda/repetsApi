"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerifyCode = void 0;
const generateVerifyCode = () => {
    let max = 9999;
    let code = Math.floor(Math.random() * max);
    while (code < 1000) {
        code = Math.floor(Math.random() * max);
    }
    return code;
};
exports.generateVerifyCode = generateVerifyCode;
//# sourceMappingURL=generateVerifyCode.js.map