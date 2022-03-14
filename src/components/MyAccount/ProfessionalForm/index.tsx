import axios from "axios";
import envConfig from "../../../../next-env-config";
import Layout from "../../layout";
import { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Image,
  Text,
  FormLabel,
  FormControl,
  Button,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Switch,
  Checkbox,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { Formik } from "formik";

import {
  InputControl,
  ResetButton,
  SubmitButton,
  SliderControl,
  SwitchControl,
  CheckboxContainer,
  CheckboxControl,
} from "formik-chakra-ui";
import { useSession } from "next-auth/react";
import { useCategories } from "../../../Provider/CategoriesProvider";
import { MultipleImagesControl } from "../../CustomFormControls/MultipleImagesControl";
import useHelper from "./useHelper";

const ProfessionalForm: React.FC = () => {
  const { initialValues, onSubmit, validationSchema } = useHelper();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useCategories();
  const { data: session } = useSession();
  const handleOnSubmit2 = async (event: any, values: any) => {
    event.preventDefault();
    let categoriesArray: any[] = [];

    for (let val in values) {
      if (Array.isArray(values[val]) && val !== "images") {
        let obj = { name: val, subcategories: values[val] };
        if (obj.subcategories.length > 0) {
          categoriesArray.push({ name: val, subcategories: values[val] });
        }
      }
    }

    let finalValues = {
      companyName: values.companyName,
      description: values.description,
      rangeCoverage: values.rangeCoverage,
      images: values.images,
      categories: categoriesArray,
    };

    const formData = new FormData();
    formData.append("path", "user/userid/files/img/form");
    formData.append("title", "imagenes-form");

    if (finalValues.images) {
      for (let i = 0; i < finalValues.images.length; i++) {
        formData.append("files", finalValues.images[i] as any);
      }
    }
    if (finalValues.categories.length > 3) {
      alert("Solo puedes seleccionar 3 categorias");
    } else {
      const {
        data: { urls },
      } = await axios.post(`${envConfig?.apiUrl}/aws/upload-files`, formData);

      const data = await axios.put("/api/user/updateToProfessional", {
        id: session!._id,
        categories: finalValues.categories,
        images: urls,
        description: finalValues.description,
        companyName: finalValues.companyName,
        rangeCoverage: finalValues.rangeCoverage,
      });

      onSubmit(finalValues);
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      width={"100%"}
      minH={"100%"}
      padding={"1rem"}
    >
      <Box padding={"0.5rem 0"}>
        <Text>Necesitamos una descripcion de lo que haces</Text>
      </Box>

      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit2}
        validationSchema={validationSchema}
      >
        {({ values, errors }) => (
          <Box
            as="form"
            onSubmit={(event: React.SyntheticEvent): Promise<void> =>
              handleOnSubmit2(event, values) as any
            }
          >
            <InputControl
              name="companyName"
              label="Nombre de la compañia"
              inputProps={{
                placeholder: "Nombre de la compañia",
                autoComplete: "off",
              }}
              isRequired
              padding={"0.5rem 0"}
            />
            <InputControl
              name="description"
              label="Descripcion de tu experiencia"
              inputProps={{
                placeholder: "Descripcion de tu experiencia",
                autoComplete: "off",
              }}
              isRequired
              padding={"0.5rem 0"}
            />
            <Box padding={"0.5rem 0"}>
              <MultipleImagesControl label="images" name="images" />
            </Box>
            <FormLabel>Seleccionar categorias</FormLabel>
            <Box padding={"0.5rem 0"}>
              <Button colorScheme="teal" onClick={onOpen}>
                Categorias
              </Button>
              <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader pt={"3rem"}>
                    Selecciona las categorias
                  </DrawerHeader>

                  <DrawerBody>
                    <Accordion allowMultiple>
                      {categories?.map((cat) => {
                        return (
                          <AccordionItem key={cat.name}>
                            <h2>
                              <AccordionButton>
                                <Image
                                  src={cat.icon}
                                  key={cat.name}
                                  boxSize={"1.7rem"}
                                  alt="cat-icon"
                                  mr={"1rem"}
                                ></Image>
                                <Box flex="1" textAlign="left">
                                  {cat.name}
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              <CheckboxContainer name={cat.name}>
                                {cat.subcategories?.map(
                                  (sub, index: number) => (
                                    <Flex key={index}>
                                      <CheckboxControl
                                        name={cat.name}
                                        value={sub._id.toString()}
                                        id={sub._id.toString()}
                                      >
                                        {sub.name}
                                      </CheckboxControl>
                                    </Flex>
                                  )
                                )}
                              </CheckboxContainer>
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>
                      Save
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </Box>

            <SliderControl
              name="rangeCoverage"
              label={`Rango de cobertura ${values.rangeCoverage} km`}
              sliderProps={{ max: 100 }}
              sliderThumbProps={{
                fontSize: "0.8rem",
                boxSize: "1.5rem",
                children: `${values.rangeCoverage}`,
                color: "gray",
                fontWeight: 800,
              }}
              isRequired
            ></SliderControl>
            <ButtonGroup>
              <SubmitButton>Submit</SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </Flex>
  );
};

export default ProfessionalForm;
