import {Types,model,models, Schema} from 'mongoose';

import {IContract} from './IContract';

const contractSchema = new Schema({
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
    addressWorke:{
        type:String
    },
},{
 
    timestamps: true,
    versionKey: false,
  }
);
export default models?.contract ||
  model<IContract>("Contract", contractSchema);