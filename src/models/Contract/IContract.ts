import {Types} from 'mongoose';

export interface IContract {
    nameCliente: string;
    emailCliente: string;
    addressCliente: string;
    nameProfessional: string;
    emailProfessional: string;
    addressProfessional: string;
    currentDate:Date,
    approxDuration:String,
    budget:Number,
    detailes:String,
    addressWorke:String,
    firmaClient:String,
    firmaProfessional:String,
}