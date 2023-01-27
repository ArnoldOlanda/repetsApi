import { Request, Response } from "express";
import moment,{Moment} from 'moment';
import { remainingSubscriptionDays } from "../helpers/calculateRemainingSubscriptionDays";
import Subscription from '../models/subscription'


export const subscriptionStatus = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const subscription = await Subscription.findOne({ user: id });

        if (subscription) {
            const remainingDays: number = remainingSubscriptionDays( new Date(), subscription?.subscription_end_date )

            return res.json({
                msg: "ok",
                subscription,
                remainingDays
            })
        }

        return res.json({
            msg: "The user has not a pethouse registered",
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        })
    }
}


export const renewSubscription = async (req: Request, res: Response) => {
    const { newRenewSubscriptionDate } = req.body
    const { id } = req.params
    try {
        const newSubscriptionEndDate = moment(new Date(newRenewSubscriptionDate)).add(1, 'M').toDate();
        const data = {
            renew_subscription_date: newRenewSubscriptionDate,
            subscription_end_date: newSubscriptionEndDate
        }
        const subscription = await Subscription.findOneAndUpdate(
            { user: id },
            data,
            { new: true }
        );

        return res.json({
            msg: "Subscription renewed",
            subscription,
        })

    } catch (error) {
        console.log(error);

        return res.status(400).json({
            err: "Error al actualizar, hable con el administrador"
        })
    }
}