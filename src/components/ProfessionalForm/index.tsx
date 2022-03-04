import Layout from "../layout";
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
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRef } from "react";

import {
  InputControl,
  ResetButton,
  SubmitButton,
  SliderControl,
  SwitchControl,
} from "formik-chakra-ui";

import useHelper from "./useHelper";
const ProfessionalForm: React.FC = () => {
  const { initialValues, onSubmit, validationSchema } = useHelper();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleOnChangeUpload = (event: any) => {
    console.log(Array.from(event.target.files));
  };

  const categories = [
    {
      name: "Electricista",
      subcategories: ["Instalaciones", "Iluminacion", "Electricidad general"],
      img: "https://cdn-icons-png.flaticon.com/512/3467/3467269.png",
    },
    {
      name: "Plomero",
      subcategories: [
        "Sanitarios",
        "Griferia",
        "Filtraciones",
        "Calderas",
        "Bombas de agua",
        "Pozos septicos",
        "Tanques de agua",
      ],
      img: "https://cdn-icons-png.flaticon.com/512/1995/1995507.png",
    },
    {
      name: "Gasista",
      subcategories: [
        "Artefactos a gas",
        "Instalacion de calderas",
        "Reparacion de calderas",
      ],
      img: "https://365psd.com/images/istock/previews/9376/93767465-fire-flame-icon.jpg",
    },
  ];

  return (
    <Container>
      <Box>
        <Image></Image>
        <Text>Hello "PROFILE NAME"</Text>
        <Text>Necesitamos una descripcion de lo que haces</Text>
      </Box>
      <Flex>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {/* <Form>
              <FormControl isRequired>
                <FormLabel>Nombre de la compañia</FormLabel>
                <Input
                  placeholder="Nombre de la compañia"
                  name="companyName"
                  onChange={handleOnChange}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Experiencia</FormLabel>
                <Input
                  placeholder="Descripcion de tu experiencia"
                  name="description"
                  onChange={handleOnChange}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>
                  Rango de cobertura {input.rangeCoverage} km
                </FormLabel>
              </FormControl>
              <Flex>
                <Slider
                  flex="1"
                  focusThumbOnChange={false}
                  value={sliderValue}
                  name="rangeCoverage"
                  onChange={sliderOnChange}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb
                    fontSize="sm"
                    boxSize="2rem"
                    children={sliderValue}
                  />
                </Slider>
              </Flex>
            </Form> */}

          {({ handleSubmit, values, errors, handleBlur }) => {
            console.log(values);

            return (
              <Box as="form" onSubmit={handleSubmit as any}>
                <>
                  <InputControl
                    name="companyName"
                    label="Nombre de la compañia"
                    inputProps={{
                      placeholder: "Nombre de la compañia",
                      autoComplete: "off",
                    }}
                    isRequired
                  />
                  <InputControl
                    name="description"
                    label="Descripcion de tu experiencia"
                    inputProps={{
                      placeholder: "Descripcion de tu experiencia",
                      autoComplete: "off",
                    }}
                    isRequired
                  />
                  <InputControl
                    name="images[]"
                    label="Subir imagenes"
                    inputProps={{
                      type: "file",
                      multiple: true,
                    }}
                    isRequired
                  />
                  <FormLabel>Seleccionar categorias</FormLabel>
                  <Box>
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
                                <AccordionItem>
                                  <h2>
                                    <AccordionButton>
                                      <Image
                                        src={cat.img}
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
                                    {cat.subcategories?.map((sub) => (
                                      <Flex justifyContent={"space-between"}>
                                        {/* <FormLabel>{sub}</FormLabel> */}
                                        <SwitchControl
                                          justifyContent={"space-between"}
                                          label={sub}
                                          id={sub}
                                          name={sub}
                                          switchProps={{
                                            size: "sm",
                                            colorScheme: "medium_green_sub",
                                          }}
                                        />
                                      </Flex>
                                    ))}
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
                      fontSize: "1rem",
                      boxSize: "2rem",
                      children: `${values.rangeCoverage}`,
                    }}
                    isRequired
                  ></SliderControl>
                  <ButtonGroup>
                    <SubmitButton>Submit</SubmitButton>
                    <ResetButton>Reset</ResetButton>
                  </ButtonGroup>
                </>
              </Box>
            );
          }}
        </Formik>
        <input type="file" multiple onChange={handleOnChangeUpload}></input>
      </Flex>
    </Container>
  );
};

export default ProfessionalForm;
