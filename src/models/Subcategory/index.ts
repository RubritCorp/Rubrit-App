//from modules
import { model, models, Schema } from "mongoose";
//interface
import { ISubcategory } from "./ISubcategory";

const subcategorySchema = new Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  icon: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default models?.Subcategory ||
  model<ISubcategory>("Subcategory", subcategorySchema);
