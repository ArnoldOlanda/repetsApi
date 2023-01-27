"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remainingSubscriptionDays = void 0;
const moment_1 = __importDefault(require("moment"));
const remainingSubscriptionDays = (subscriptionStarts, subscriptionEnds) => {
    const now = (0, moment_1.default)(new Date(subscriptionStarts));
    const subscriptionEndDate = (0, moment_1.default)(new Date(subscriptionEnds));
    return subscriptionEndDate.diff(now, 'days');
};
exports.remainingSubscriptionDays = remainingSubscriptionDays;
//# sourceMappingURL=calculateRemainingSubscriptionDays.js.map