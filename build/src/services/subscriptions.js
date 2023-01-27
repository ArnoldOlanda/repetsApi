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
exports.renewSubscription = exports.subscriptionStatus = void 0;
const moment_1 = __importDefault(require("moment"));
const calculateRemainingSubscriptionDays_1 = require("../helpers/calculateRemainingSubscriptionDays");
const subscription_1 = __importDefault(require("../models/subscription"));
const subscriptionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subscription = yield subscription_1.default.findOne({ user: id });
        if (subscription) {
            const remainingDays = (0, calculateRemainingSubscriptionDays_1.remainingSubscriptionDays)(new Date(), subscription === null || subscription === void 0 ? void 0 : subscription.subscription_end_date);
            return res.json({
                msg: "ok",
                subscription,
                remainingDays
            });
        }
        return res.json({
            msg: "The user has not a pethouse registered",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        });
    }
});
exports.subscriptionStatus = subscriptionStatus;
const renewSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newRenewSubscriptionDate } = req.body;
    const { id } = req.params;
    try {
        const newSubscriptionEndDate = (0, moment_1.default)(new Date(newRenewSubscriptionDate)).add(1, 'M').toDate();
        const data = {
            renew_subscription_date: newRenewSubscriptionDate,
            subscription_end_date: newSubscriptionEndDate
        };
        const subscription = yield subscription_1.default.findOneAndUpdate({ user: id }, data, { new: true });
        return res.json({
            msg: "Subscription renewed",
            subscription,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        });
    }
});
exports.renewSubscription = renewSubscription;
//# sourceMappingURL=subscriptions.js.map