import {
  Box,
  Heading,
  Flex,
  Text,
  Stack,
  Image,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Star, Check, Checks } from "phosphor-react";
import { Formik } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { StepTwoFields } from "./Fields";
import SuccessMessage from "components/ResultMessages/SuccessMessage";
import ErrorMessage from "components/ResultMessages/ErrorMessage";
import {
  initialValues,
  validationSchema,
  handleSubmit,
} from "./newPrivateServiceRequestHelper";
import { useRouter } from "next/router";
import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";

const PrivateRequest: React.FC<{ professionalId: string }> = ({
  professionalId,
}) => {
  return (
    <Flex w="full" justifyContent="center" flexWrap="wrap-reverse" gap="40px">
      <PrivateRequestMain professionalId={professionalId} />
      <PrivateRequestSide />
    </Flex>
  );
};

const PrivateRequestMain: React.FC<{ professionalId: string }> = ({
  professionalId,
}) => {
  const [isRequestSuccessful, setIsRequestSuccessful] = useState<
    null | boolean
  >(null);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  async function preSubmit(event: any, values: any) {
    event.preventDefault();
    if (session && status === "authenticated") {
      setLoading(true);
      // Append professionalId to values object (solution to using a hidden form field)
      values.professionalId = professionalId;
      const { success } = await handleSubmit(values);
      setIsRequestSuccessful(success);
      setLoading(false);
    } else {
      document.getElementById("signInButton")?.click();
    }
  }

  useEffect(() => {
    if (String(session?._id) === professionalId) {
      toast({
        title: `Aviso importante! No puedes crear una solicitud privada siendo el usuario que la envia y recibe.`,
        status: "error",
        isClosable: true,
      });
    }
  }, []);
  function showCurrentStep() {
    let CurrentComponent;

    if (isRequestSuccessful === null) {
      // Render component when form is not sent yet
      CurrentComponent = <StepTwoFields />;
    } else if (isRequestSuccessful === true) {
      CurrentComponent = <SuccessMessage />;
    } else {
      CurrentComponent = <ErrorMessage />;
    }

    return CurrentComponent;
  }

  function showCurrentButtons(values: any, isSubmitting: boolean, errors: any) {
    if (isRequestSuccessful === null) {
      return (
        <SubmitButton
          isLoading={loading}
          color="white"
          alignSelf="center"
          bg="green.500"
          rounded="full"
          px={6}
          _hover={{
            bg: "green.600",
          }}
          disabled={
            String(session?._id) === professionalId ||
            values.title.length === 0 ||
            Object.keys(errors).length > 0 ||
            isSubmitting ||
            loading
          }
        >
          Enviar solicitud
        </SubmitButton>
      );
    } else {
      return null;
    }
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      gap="2rem"
      padding="20px 25px"
      flex="2"
      bg={useColorModeValue("gray.300", "gray.900")}
      color={useColorModeValue("black", "white")}
      boxShadow="rgba(0, 0, 0, 0.25)"
      borderRadius="15px"
      textAlign="center"
    >
      <Heading display={isRequestSuccessful !== null ? "none" : "inherit"}>
        <Text>¿Qué necesitas?</Text>
      </Heading>
      <Box display={isRequestSuccessful !== null ? "none" : "block"}>
        <Text>Tu seguridad es muy importante para nosotros.</Text>
        <Text>
          Rubrit no dará tu dirección ni teléfono a ningún profesional.
        </Text>
      </Box>
      <Formik
        initialValues={initialValues}
        onSubmit={preSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, isSubmitting }) => (
          <>
            <Box
              as="form"
              w="100%"
              onSubmit={(e: React.SyntheticEvent): Promise<void> =>
                preSubmit(e, values)
              }
            >
              <Stack py="15px">{showCurrentStep()}</Stack>
              <Flex gap="1rem" justifyContent="center" py="1rem">
                {showCurrentButtons(values, isSubmitting, errors)}
              </Flex>
            </Box>
          </>
        )}
      </Formik>
    </Stack>
  );
};

const PrivateRequestSide: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<any>();
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get(
            `/api/public/users/getUserById?id=${id}`
          );

          setUser(data.user[0]);
        } catch (err) {
          console.log(err);

          toast({
            title: "Error al cargar el usuario.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
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
        <Image
          src={user?.profilePic}
          borderRadius="full"
          w="40px"
          h="40px"
          alt="profile-picture"
        />
        <Stack>
          <Heading as="h3" size="md">
            {user?.name}
          </Heading>
          <Text
            fontSize="xs"
            margin="0 !important"
          >{`${user?.address?.name}`}</Text>
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
        <Text mt={2}>Servicios Ofrecidos :</Text>
        {user?.items?.map((m: any, i: number) => (
          <Flex key={i} alignItems={"center"}>
            <CheckIcon color={"medium_green"} />
            <Text ml={2}>{m.category.name}</Text>
          </Flex>
        ))}
      </Flex>
    </Stack>
  );
};

export default PrivateRequest;
