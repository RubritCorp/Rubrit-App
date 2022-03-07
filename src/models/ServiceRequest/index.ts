//from modules
import { model, models, Schema } from "mongoose";
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
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.ServiceRequest || model<IServiceRequest>("ServiceRequest", serviceRequestSchema);
