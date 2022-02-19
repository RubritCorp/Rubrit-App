//from modules
import { model, models, Schema, Types } from "mongoose";
//interface
import { ICategorie } from "./ICategorie";

const categorieSchema = new Schema({
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
  subcategories: [
    {
      type: Types.ObjectId,
      ref: "Subcategorie",
    },
  ],
});

export default models?.Categorie ||
  model<ICategorie>("Categorie", categorieSchema);
