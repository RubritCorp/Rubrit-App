//from modules
import { model, models, Schema, Types } from "mongoose";
//interface
import { ICategory } from "./ICategory";

const categorySchema = new Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  icon: {
    type: String,
    default: "",
  },
  description: {
    type: String,
  },
  subcategories: [
    {
      type: Types.ObjectId,
      ref: "Subcategory",
    },
  ],
});

export default models?.Category || model<ICategory>("Category", categorySchema);
