import {Types} from 'mongoose';

export interface IContract {
    user:Types.ObjectId,
    professional:Types.ObjectId,
    currentDate:Date,
    approxDuration:String,
    budget:Number,
    detailes:String,
    state:Boolean,
}