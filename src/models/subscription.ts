import { Schema, model } from 'mongoose';

interface ISubscription {
    subscription_date: Date;
    renew_subscription_date: Date;
    subscription_end_date: Date;
    free_month: boolean;
    status: string;
    user: Schema.Types.ObjectId;
    type: string;
}


const SubscriptionSchema = new Schema<ISubscription>({
    subscription_date:{
        type: Date,
        required:true
    },
    renew_subscription_date:{
        type: Date,
        required:true
    },
    subscription_end_date:{
        type:Date,
        // required:true
    },
    free_month: {
        type: Boolean,
        required: true,
        default: true
    },
    status: {
        type: String,
        required:true,
        default:"active"
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    type:{
        type:String,
        required:true,
        default: "monthly"  // yearly
    }
    
});

SubscriptionSchema.methods.toJSON = function () {
    const { __v, _id, ...subscription } = this.toObject();
    subscription.uid = _id;
    return subscription;
}

export default model( 'Subscription', SubscriptionSchema );