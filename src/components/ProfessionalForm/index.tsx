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

  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [pathFiles, setPathFiles] = useState<any>({});
  const [blob, setBlob] = useState<any>([]);
  // const [form, setForm] = useState<any>({
  //   companyName,
  //   description,
  //   location,
  //   rangeCoverage,
  //   category,
  //   subcategories,
  //   images,
  // });

  const btnRef = useRef();
  const inputFileRef = useRef<HTMLInputElement>(null);
  // const handleOnChangeUpload = (event: any) => {
  //   console.log(Array.from(event.target.files));
  // };

  const handleOnChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let dire = e.target.files;

      setPathFiles({ ...dire });

      const filesArray: any = Array.from(e.target.files).map((file: any) => {
        let path = URL.createObjectURL(file);
        setBlob([...blob, path]);
        return path;
      });

      setSelectedFiles((prevImages: any) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file: any) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };
  console.log(inputFileRef);
  const handleDeletePhoto = (e: any) => {
    if (inputFileRef.current) {
      let ref = inputFileRef.current.files;
      let arrayBlob = {};

      let blobBlob = blob.findIndex((event: any) => {
        console.log(event, e.target.value);
        let index = event.indexOf(`${e.target.value}`);

        if (index !== -1) {
          setBlob(blob.filter((_: any, i: number) => index !== i));
          for (let value in ref) {
            if (value !== index) {
              arrayBlob = { ...arrayBlob, [value]: ref[Number(value)] };
            }
          }

          console.log(blob);
        }
      });
    }

    if (selectedFiles.includes(String(e.target.value))) {
      let filters = selectedFiles.filter(
        (element: any) => element !== e.target.value
      );

      return setSelectedFiles(filters);
    }
  };

  const renderPhotos = (source: any) => {
    // console.log("source: ", source);
    return source.map((photo: any) => {
      return (
        <Flex flexDirection={"column"}>
          <Box position={"relative"} top={"20px"}>
            <Button
              size="xs"
              bgColor="red"
              onClick={handleDeletePhoto}
              value={photo}
            >
              X
            </Button>
          </Box>
          <Image
            src={photo}
            alt=""
            key={photo}
            maxW={"150px"}
            p={"0.2rem 0.8rem"}
          />
          {/* <Box position={"relative"} left={"150px"}>
            <Button size="xs">X</Button>
          </Box> */}
        </Flex>
      );
    });
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

          {({ handleSubmit, values, errors }) => (
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

                <div className="heading">React Multiple Images Preview</div>
                <Box maxW="300px">
                  {/* <InputControl
                      name="images[]"
                      label="Subir imagenes"
                      inputProps={{
                        type: "file",
                        multiple: true,
                        accept: "image/png, image/jpeg",
                        onChange: handleOnChangeUpload,
                      }}
                      isRequired
                    /> */}
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
                </Box>

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
                                      src={cat.img}
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
                                  {cat.subcategories?.map((sub) => (
                                    <Flex
                                      justifyContent={"space-between"}
                                      key={sub}
                                    >
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
          )}
        </Formik>
      </Flex>
    </Container>
  );
};

export default ProfessionalForm;
