import { InputControl, SelectControl, TextareaControl } from "formik-chakra-ui";
import React, { useEffect, useState } from "react";
import { LocationControl } from "components/CustomFormControls/LocationControl";
import { MultipleImagesControl } from "components/CustomFormControls/MultipleImagesControl";
import { useCategories } from "Provider/CategoriesProvider";
import type { ISubcategory } from "models/Subcategory/ISubcategory";

export const StepOneFields: React.FC<{ selectedCategory: any }> = ({
  selectedCategory,
}) => {
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const { categories, loading } = useCategories();

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    let subcategories = getSubcategories(event.target.value.toString());
    if (subcategories) setSubcategories(subcategories);
  }

  function getSubcategories(category_id: string) {
    let category = categories.find((cat) => cat._id.toString() === category_id);
    if (category) return category.subcategories;
  }

  useEffect(() => {
    // Show subcategories in case user clicks 'back' button on StepTwoFields
    if (selectedCategory) {
      let subcategories = getSubcategories(selectedCategory);
      if (subcategories) setSubcategories(subcategories);
    }
  }, [getSubcategories, selectedCategory]);

  return (
    <>
      <SelectControl
        name="category"
        label="Categoría"
        onChange={(e: any) => handleSelect(e)}
        labelProps={{
          margin: "0 0 8px 0",
        }}
        selectProps={{
          placeholder: loading ? "Cargando..." : "Ver categorías",
        }}
      >
        {loading
          ? null
          : categories?.map((category) => (
              <option
                key={category._id.toString()}
                value={category._id.toString()}
              >
                {category.name}
              </option>
            ))}
      </SelectControl>
      <SelectControl
        name="subcategory"
        label="Subcategoría"
        labelProps={{
          margin: "8px 0 8px 0",
        }}
        selectProps={{
          placeholder: loading ? "Cargando..." : "Ver subcategorías",
        }}
      >
        {subcategories?.map((subcategory) => (
          <option
            key={subcategory._id.toString()}
            value={subcategory._id.toString()}
          >
            {subcategory.name}
          </option>
        ))}
      </SelectControl>
    </>
  );
};

export const StepTwoFields: React.FC = () => {
  return (
    <>
      <InputControl
        name="title"
        label="Título de la solicitud"
        inputProps={{
          placeholder: "Reparación de fuga de agua",
          autoComplete: "off",
        }}
      />
      <TextareaControl
        name="description"
        label="Descripción de la solicitud"
        textareaProps={{
          placeholder: "Tengo una filtración en la cocina que debo reparar.",
        }}
      />
      <LocationControl label="Ubicación del servicio" name="location" />
      <MultipleImagesControl label="Añadir fotos" name="images" />
    </>
  );
};
