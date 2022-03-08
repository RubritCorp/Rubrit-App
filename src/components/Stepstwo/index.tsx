import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { InputControl, TextareaControl, SubmitButton } from "formik-chakra-ui";
import { Star, Check, Checks } from "phosphor-react";
import { Formik } from "formik";
import { LocationControl } from "components/CustomFormControls/LocationControl";
import { MultipleImagesControl } from "components/CustomFormControls/MultipleImagesControl";
import {
  initialValues,
  validationSchema,
  handleSubmit,
} from "./newServiceRequestHelper";

const Stepstwo: React.FC = () => {
  const user = {
    name: "Rodolfo Pérez",
    title: "Gasista",
    picture: "https://avatars0.githubusercontent.com/u/1164541?v=4",
    city: "Cordoba",
    country: "Argentina",
  };
  console.log(process.env.NEXT_PUBLIC_MAPS_API_KEY);

  return (
    <Flex w="full" justifyContent="center" flexWrap="wrap-reverse" gap="40px">
      <Stack
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
        padding="20px 25px"
        flex="2"
        bg={useColorModeValue("gray.100", "gray.900")}
        color={useColorModeValue("black", "white")}
        boxShadow="rgba(0, 0, 0, 0.25)"
        borderRadius="15px"
      >
        <Heading>
          <Text>¿Qué necesitas?</Text>
        </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors }) => (
            <Box as="form" w="100%" onSubmit={handleSubmit as any}>
              <Stack py="15px">
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
                    placeholder:
                      "Tengo una filtración en la cocina que debo reparar.",
                  }}
                />
                <LocationControl
                  label="Ubicación del servicio"
                  name="location"
                />
                <MultipleImagesControl label="Añadir fotos" name="images" />
              </Stack>

              <Stack py="10px" gap="10px" wrap={"nowrap"}>
                <Button
                  alignSelf="center"
                  bg="green.500"
                  rounded="full"
                  px={6}
                  _hover={{
                    bg: "green.600",
                  }}
                >
                  Añadir fotos
                </Button>
                <SubmitButton
                  alignSelf="center"
                  bg="green.500"
                  rounded="full"
                  px={6}
                  _hover={{
                    bg: "green.600",
                  }}
                  disabled={Object.keys(errors).length > 0}
                >
                  Enviar solicitud
                </SubmitButton>
              </Stack>
            </Box>
          )}
        </Formik>
      </Stack>

      <Stack
        flex="1"
        gap="10px"
        padding="20px 25px"
        bg={useColorModeValue("gray.100", "gray.900")}
        color={useColorModeValue("black", "white")}
        boxShadow="rgba(0, 0, 0, 0.25)"
        borderRadius="15px"
        h="full"
        alignSelf="flex-end"
      >
        <Heading alignSelf="center">Tu profesional</Heading>
        <Flex gap="20px" alignItems="center">
          <Image src={user.picture} borderRadius="full" w="40px" h="40px" />
          <Stack>
            <Heading as="h3" size="md">
              {user.name}
            </Heading>
            <Text
              fontSize="xs"
              margin="0 !important"
            >{`${user.city}, ${user.country}`}</Text>
          </Stack>
        </Flex>

        <Flex flexDirection={"column"}>
          <Flex flexDirection={"row"}>
            <Star size={20} weight="fill" />

            <Text
              ml={"0.5rem"}
              fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
            >
              90% de satisfaccion
            </Text>
          </Flex>
          <Flex flexDirection={"row"}>
            <Check size={20} weight="fill" />
            <Text
              ml={"0.5rem"}
              fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
            >
              900 Trabajos realizados
            </Text>
          </Flex>
          <Flex flexDirection={"row"}>
            <Checks size={20} weight="fill" />
            <Text
              ml={"0.5rem"}
              fontSize={{ base: "0.7rem", md: "0.8rem", lg: "1rem" }}
            >
              97% formalidad
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Stepstwo;
