import {Types} from 'mongoose';

export interface IContract {
    client: Types.ObjectId;
    profesional: Types.ObjectId;
    approxDuration:String,
    budget:Number,
    detailes:String,
    addressWorke:String,

}