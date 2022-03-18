import {Types,model,models, Schema} from 'mongoose';

import {IContract} from './IContract';

const contractSchema = new Schema({
    nameCliente: {
        type: String,
        required: true,
    },
    emailCliente: {
        type: String,
        required: true,
    },
    addressCliente: {
        type: String,
        required: true,
    },
    nameProfessional: {
        type: String,
        required: true,
    },
    emailProfessional: {
        type: String,
        required: true,
    },
    addressProfessional: {
        type: String,
        required: true,
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
    addressWorke:{
        type:String
    },
    firmaClient:{
        type:String
    },
    firmaProfessional:{
        type:String
    }
},{
 
    timestamps: true,
    versionKey: false,
  }
);
export default model<IContract>('Contract',contractSchema);