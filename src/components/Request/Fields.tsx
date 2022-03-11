import { InputControl, SelectControl, TextareaControl } from "formik-chakra-ui";
import React, { useState } from "react";
import { LocationControl } from "components/CustomFormControls/LocationControl";
import { MultipleImagesControl } from "components/CustomFormControls/MultipleImagesControl";
import { useCategories } from "Provider/CategoriesProvider";

export const StepOneFields: React.FC = () => {
  const [ subcategories, setSubcategories ] = useState<any[]>([]);
  const { categories, loading } = useCategories();

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    let category = categories.find(cat => cat._id.toString() === event.target.value.toString()) 
    if (category) setSubcategories(category.subcategories);
  }

  return (
    <>
      <SelectControl
        name='category'
        label='Categoría'
        onChange={(e: any) => handleSelect(e)}
        labelProps={{
          margin: '0 0 8px 0'
        }}
        selectProps={{
          placeholder: 'Ver categorías'
        }}
      >
        { loading ? null : categories?.map(category => <option key={category._id.toString()} value={category._id.toString()}>{category.name}</option>) }
      </SelectControl>
      <SelectControl
        name='subcategory'
        label='Subcategoría'
        labelProps={{
          margin: '8px 0 8px 0'
        }}
        selectProps={{
          placeholder: 'Ver subcategorías'
        }}
      >
        { subcategories?.map(subcategory => <option key={subcategory._id.toString()} value={subcategory._id.toString()}>{subcategory.name}</option>) }
      </SelectControl>
    </>
  );
}

export const StepTwoFields: React.FC = () => {
  return (
    <>
      <InputControl
        name='title'
        label='Título de la solicitud'
        inputProps={{
          placeholder: 'Reparación de fuga de agua',
          autoComplete: 'off',
        }}
      />
      <TextareaControl 
        name='description'
        label='Descripción de la solicitud'
        textareaProps={{
          placeholder: 'Tengo una filtración en la cocina que debo reparar.'
        }}
      />
      <LocationControl label='Ubicación del servicio' name='location' />
      <MultipleImagesControl label='Añadir fotos' name='images' />
    </>
  );
}