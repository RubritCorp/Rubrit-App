import { InputControl, SelectControl, TextareaControl } from "formik-chakra-ui";
import { LocationControl } from "components/CustomFormControls/LocationControl";
import { MultipleImagesControl } from "components/CustomFormControls/MultipleImagesControl";

export const StepOneFields: React.FC = () => {
  return (
    <>
      <SelectControl
        name='category'
        label='Categoría'
        labelProps={{
          margin: '0 0 8px 0'
        }}
        selectProps={{
          placeholder: 'Ver categorías'
        }}
      >
        <option value='hoal'>Plomería</option>
        <option value='hoaj'>Electricidad</option>
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
        <option value='hoal'>General</option>
        <option value='hoaj'>Específico</option>
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