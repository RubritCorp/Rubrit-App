//models
import Category from "models/Category";
//interface
//db
import "utils/db";

export default async function getCategoryByName(name: string) {
  if (!name) return { message: "Name is required" };
  try {
    const category = await Category.find({ name: name });
    if (!category) {
      return { message: "Error fetching categories" };
    } else {
      return { category };
    }
  } catch (err) {
    return { message: "Error fetching data" };
  }
}
