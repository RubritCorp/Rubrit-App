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
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";

import useHelper from "./useHelper";
const ProfessionalForm: React.FC = () => {
  const { initialValues, onSubmit, validationSchema } = useHelper();

  const [input, setInput] = useState(initialValues);
  const [sliderValue, setSliderValue] = useState(0);

  const sliderOnChange = (value: number) => {
    setSliderValue(value);
    setInput({
      ...input,
      rangeCoverage: value,
    });
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <Layout>
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
            <Form>
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
            </Form>
          </Formik>
        </Flex>
      </Container>
    </Layout>
  );
};

export default ProfessionalForm;
