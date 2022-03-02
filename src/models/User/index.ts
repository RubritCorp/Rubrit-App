//from modules
import mongoose, { model, models, Schema, Types } from "mongoose";
import { number } from "yup/lib/locale";
//interfaces
import { IUser } from "./IUser";

//create user schema for db petitions
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    authCode: {
      type: String,
    },
    withProvider: {
      type: Boolean,
      default: true,
    },
    isAuthenticated: {
      type: Boolean,
      default: true,
    },
    profilePic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isWorker: {
      type: Boolean,
      default: false,
    },
    address: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    hideAddress: {
      type: Boolean,
      default: false,
    },
    rating: {
      description: {
        type: String,
      },
      score: {
        type: String,
      },
    },
    items: [
      {
        category: {
          type: Types.ObjectId,
          ref: "Category",
        },
        subcategories: [
          {
            type: Types.ObjectId,
            ref: "Subcategory",
          },
        ],
        description: {
          type: String,
        },
        certification: [
          {
            type: String,
          },
        ],
      },
    ],
    offers: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        photos: [{ type: String }],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.User || model<IUser>("User", userSchema);
