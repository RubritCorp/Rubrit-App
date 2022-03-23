//from modules
import { model, models, Schema, Types } from "mongoose";
//interfaces
import type IServiceRequest from "./IServiceRequest";

//create user schema for db petitions
const serviceRequestSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      formattedAddress: { type: String, required: true },
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    images: Array,
    userId: {
      type: Types.ObjectId,
      required: true
    },
    professionalId: { type: Types.ObjectId, default: null },
    category: { type: Types.ObjectId, default: null },
    subcategory: { type: Types.ObjectId, default: null },
    state : {
      
      active: {
        type: Boolean,
        required: true,
        default: true
      },
      pending: {
        type: Boolean,
        required: true,
        default: false
      },
      completed: {
        type: Boolean,
        required: true,
        default: false
      },
      canceled: {
        type: Boolean,
        required: true,
        default: false
      },
      comment: {
        type: String,
      }

    },
   
    contractId: Types.ObjectId,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default models?.ServiceRequest || model<IServiceRequest>("ServiceRequest", serviceRequestSchema);
