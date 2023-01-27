import moment, {Moment} from 'moment';



export const remainingSubscriptionDays = (subscriptionStarts: Date, subscriptionEnds: Date): number => {

    const now: Moment = moment(new Date(subscriptionStarts));
    const subscriptionEndDate: Moment = moment(new Date(subscriptionEnds));
    
    return subscriptionEndDate.diff(now, 'days');

}