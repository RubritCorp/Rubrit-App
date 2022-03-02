//from modules
import { model, models, Schema } from "mongoose";
//interface
import { ISubcategory } from "./ISubcategory";

const subcategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
});

export default models?.Subcategory ||
  model<ISubcategory>("Subcategory", subcategorySchema);
