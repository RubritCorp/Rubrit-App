import {
  Flex,
  Box,
  Image,
  Text,
  FormLabel,
  Button,
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
  Checkbox,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { Formik } from "formik";

import {
  InputControl,
  ResetButton,
  SubmitButton,
  SliderControl,
  CheckboxContainer,
  CheckboxControl,
  TextareaControl,
} from "formik-chakra-ui";

import { MultipleImagesControl } from "../../CustomFormControls/MultipleImagesControl";
import useHelper from "./useHelper";
import { useCategories } from "Provider/CategoriesProvider";

const ProfessionalForm: React.FC = () => {
  const { initialValues, validationSchema, handleOnSubmit, values } =
    useHelper();
  const { description, rangeCoverage, images, certification } = values;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useCategories();

  function handleSaveCat() {
    //Lugar para poder hacer la validacion de categorias

    onClose();
  }

  return (
    <Flex
      flexDirection={"row"}
      alignItems={"flex-start"}
      width={"100%"}
      minH={"100%"}
      padding={"1rem"}
    >
      {/* <Box padding={"0.5rem 0"}>
        <Text>Necesitamos una descripcion de lo que haces</Text>
      </Box> */}
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors }) => (
          <Box
            as="form"
            onSubmit={(event: React.SyntheticEvent): Promise<void> =>
              handleOnSubmit(event, values) as any
            }
          >
            <TextareaControl
              name="description"
              label="Descripcion de tu experiencia"
              padding={"0.5rem 0"}
            />
            <Box padding={"0.5rem 0"}>
              <MultipleImagesControl
                label="images"
                name="images"
                title={"Imagenes de trabajos realizados"}
              />
            </Box>
            <Box padding={"0.5rem 0"}>
              <MultipleImagesControl
                label="certification"
                name="certification"
                title={"Imagenes de certificados, titulos, matriculas"}
              />
            </Box>
            <FormLabel>Seleccionar entre 1 y 3 categorias</FormLabel>
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
                      {categories?.map((cat: any, index: number) => {
                        return (
                          <AccordionItem key={cat.name}>
                            <h2>
                              <AccordionButton>
                                <Image
                                  src={cat.icon}
                                  key={index}
                                  boxSize={"1.7rem"}
                                  alt={`cat-icon-${cat.name}`}
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
                                  (sub: any, index: number) => (
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
                    <Button colorScheme="blue" onClick={handleSaveCat}>
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
              <SubmitButton
                disabled={
                  // Object.keys(errors).length > 0 ||
                  // !Object.values(values)[0].length ||
                  // Object.keys(values).length < 9 ||
                  // Object.keys(values).length > 5
                  //   ? true
                  //   :
                  false
                }
              >
                Submit
              </SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
      <Box margin={"0 55px"}>
        {description.length > 0 && (
          <>
            <Box>
              <Heading size="md">Descripcion</Heading>
              <Text>{description}</Text>
            </Box>
            <Box>
              <Heading size="md">Rango de cobertura</Heading>
              <Text>{rangeCoverage}</Text>
              <Heading size="sm">Fotos de trabajos realizados</Heading>
              <Box margin={"20px 0"}>
                {images?.map((e: any) => (
                  <Image src={e} boxSize="100px" alt="alt" />
                ))}
              </Box>
              <Heading size="sm">Fotos de trabajos realizados</Heading>
              <Box margin={"20px 0"}>
                {certification?.map((e: any) => (
                  <Image src={e} boxSize="100px" alt="alt" />
                ))}
              </Box>
              <Heading size="sm">Categorias</Heading>

              {values?.categoriesArray?.map((cat: any, i: number) => (
                <>
                  <Text key={i}>{cat.name}</Text>
                  <Box>
                    {cat.subcategories.map((sub: any, i: number) => (
                      <Text key={i}>{sub.name}</Text>
                    ))}
                  </Box>
                </>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default ProfessionalForm;
