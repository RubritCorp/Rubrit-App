//from modules
import { model, models, Schema } from "mongoose";
//interface
import { ISubcategorie } from "./ISubcategorie";

const subcategorieSchema = new Schema({
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

export default models?.Subcategorie ||
  model<ISubcategorie>("Subcategorie", subcategorieSchema);
