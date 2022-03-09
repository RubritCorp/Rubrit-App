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
} from "formik-chakra-ui";
import { useCategories } from "../../../Provider/CategoriesProvider";
import { MultipleImagesControl } from "../../CustomFormControls/MultipleImagesControl";
import useHelper from "./useHelper";

const ProfessionalForm: React.FC = () => {
  const { initialValues, onSubmit, validationSchema } = useHelper();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useCategories();

  function CustomIcon(props: any) {
    const { isIndeterminate, isChecked, ...rest } = props;

    const d = isIndeterminate
      ? "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z"
      : "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z";

    return (
      <Icon viewBox="0 0 24 24" {...rest}>
        <path fill="currentColor" d={d} />
      </Icon>
    );
  }

  const handleOnSubmit2 = (event: any, values: any) => {
    event.preventDefault();
    onSubmit(values);
  };

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      width={"100%"}
      minH={"100%"}
      padding={"1rem"}
    >
      <Box>
        <Image></Image>
        <Text>Hello "PROFILE NAME"</Text>
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
            <MultipleImagesControl label="images" name="images" />
            <div className="heading">React Multiple Images Preview</div>
            {/* <Box maxW="300px">
                  <input
                    name="images[]"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleOnChangeUpload}
                    ref={inputFileRef}
                    multiple
                  ></input>

                  <Flex flexDirection={"row"}>
                    {renderPhotos(selectedFiles)}
                  </Flex>
                </Box> */}

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
                              {cat.subcategories?.map((sub, index: number) => (
                                <Flex key={index}>
                                  {/* <SwitchControl
                                        justifyContent={"space-between"}
                                        label={sub.name}
                                        name={sub.name}
                                        switchProps={{
                                          size: "sm",
                                          colorScheme: "medium_green_sub",
                                        }}
                                      />
                                       */}

                                  <Stack mt={1} spacing={1}>
                                    <Checkbox
                                      icon={<CustomIcon />}
                                      colorScheme={"light_green_sub"}
                                    >
                                      {sub.name}
                                    </Checkbox>
                                  </Stack>
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
