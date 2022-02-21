//from modules
import { model, models, Schema, Types } from "mongoose";
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
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: "assets/user.png",
    },
    isWorker: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
    hideAddress: {
      type: Boolean,
      default: false,
    },
    rating: [
      {
        description: {
          type: String,
        },
        score: {
          type: String,
        },
      },
    ],
    items: [
      {
        categorie: {
          type: Types.ObjectId,
          ref: "Categorie",
        },
        subcategories: [
          {
            type: Types.ObjectId,
            ref: "Subcategorie",
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
    offers: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      photos: [{ type: String }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models?.User || model<IUser>("Task", userSchema);
