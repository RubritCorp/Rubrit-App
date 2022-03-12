import {Types,model,models, Schema} from 'mongoose';

import {IContract} from './IContract';

const contractSchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:'User'
    },
    
    professional:{
        type:Types.ObjectId,
        ref:'User'
    },
    
    currentDate:{
        type:Date
    },
    approxDuration:{
        type:String
    },
    budget:{
        type:Number
    },
    detailes:{
        type:String
    },
    state:{
        type:Boolean
    }
},
 {
    timestamps: true,
    versionKey: false,
  }
);
export default model<IContract>('Contract',contractSchema);