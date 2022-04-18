//react - next
import Script from "next/script";
import React, { useState, useEffect } from "react";
import { NextPage } from "next";
//thirds dep
import axios from "axios";
//config
import envConfig from "../../../../next-env-config";
//styles
import { CheckCircle } from "phosphor-react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Heading,
  VStack,
} from "@chakra-ui/react";

const BecomePremium: React.FC<{ email: string }> = ({ email }) => {
  const [input, setInput] = useState({
    cardNumber: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    cardholderName: "",
    cardholderEmail: "",
    securityCode: "",
    identificationNumber: "",
  });
  const [plan, setPlan] = useState<any>({});
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const name = id.substring(15);
    setInput({ ...input, [name]: value });
  };

  const isError = {
    cardNumber: input.cardNumber === "",
    cardExpirationMonth: input.cardExpirationMonth === "",
    cardExpirationYear: input.cardExpirationYear === "",
    cardholderName: input.cardholderName === "",
    cardholderEmail: input.cardholderEmail === "",
    securityCode: input.securityCode === "",
    identificationNumber: input.identificationNumber === "",
  };

  const [script1, setScript1] = useState(false);

  const getPlan = async () => {
    const res = await axios.get(`${envConfig?.apiUrl}/subs/plan`);
    if (res.statusText) {
      setPlan(res.data);
    }
  };
  useEffect(() => {
    getPlan();
  }, []);

  return (
    <Box alignItems={"flex-start"} width={"100%"} minH={"100%"} marginTop="10">
      <VStack spacing={4} align="stretch">
        <VStack spacing={4} marginTop="10px">
          <Heading fontSize="xl" color={"medium_green"}>
            ¿Porque ser Premium?
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckCircle} color="medium_green" weight="fill" />
              Las ofertas de trabajo te llegan mas rapido. Te avisamos antes que
              los demas
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircle} color="medium_green" weight="fill" />
              Chats con clientes ilimitados
            </ListItem>
            <ListItem>
              <ListIcon as={CheckCircle} color="medium_green" weight="fill" />
              Todo por un precio de: $500 (pesos)
            </ListItem>
          </List>
        </VStack>

        <Grid
          as="form"
          id="form-checkout"
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          templateRows={{ base: "repeat(10, auto)", md: "repeat(5, auto)" }}
          // autoRows={"minmax(200px,auto)"}
          gap={4}
        >
          <FormControl isInvalid={isError.cardNumber}>
            <FormLabel htmlFor="form-checkout__cardNumber">
              Numero de tarjeta
            </FormLabel>
            <Input
              id="form-checkout__cardNumber"
              type="text"
              onChange={handleInputChange}
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            {!isError.cardNumber ? (
              <FormHelperText>Formato xxxx-xxxx-xxxx-xxxx.</FormHelperText>
            ) : (
              <FormErrorMessage>
                Numero de tarjeta es requerido.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isError.cardExpirationMonth}>
            <FormLabel htmlFor="form-checkout__cardExpirationMonth">
              Mes de vencimiento
            </FormLabel>
            <Input
              id="form-checkout__cardExpirationMonth"
              type="text"
              onChange={handleInputChange}
              placeholder="xx"
            />
            {!isError.cardExpirationMonth ? (
              <FormHelperText>Formato xx</FormHelperText>
            ) : (
              <FormErrorMessage>
                Mes de vencimiento es requerido.
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isError.cardExpirationYear}>
            <FormLabel htmlFor="form-checkout__cardExpirationYear">
              Año de vencimiento
            </FormLabel>
            <Input
              id="form-checkout__cardExpirationYear"
              type="text"
              onChange={handleInputChange}
              placeholder="xx"
            />
            {!isError.cardExpirationYear ? (
              <FormHelperText>Formato xx</FormHelperText>
            ) : (
              <FormErrorMessage>
                Año de vencimiento es requerido.
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isError.cardholderName}>
            <FormLabel htmlFor="form-checkout__cardholderName">
              Nombre y apellido de titular
            </FormLabel>
            <Input
              id="form-checkout__cardholderName"
              type="text"
              onChange={handleInputChange}
              placeholder="Como aparece en la tarjeta"
            />
            {!isError.cardholderName ? (
              <FormHelperText>Como aparece en la tarjeta</FormHelperText>
            ) : (
              <FormErrorMessage>
                Nombre y apellido de titular es requerido.
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isError.cardholderEmail}>
            <FormLabel htmlFor="form-checkout__cardholderEmail">
              Email
            </FormLabel>
            <Input
              id="form-checkout__cardholderEmail"
              className={email}
              type="email"
              onChange={handleInputChange}
              placeholder="Para vincular la subscripción"
            />
            {!isError.cardholderEmail ? (
              <FormHelperText>Para vincular la subscripción</FormHelperText>
            ) : (
              <FormErrorMessage>Email es requerido.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isError.securityCode}>
            <FormLabel htmlFor="form-checkout__securityCode">
              Codigo de seguridad
            </FormLabel>
            <Input
              id="form-checkout__securityCode"
              type="text"
              onChange={handleInputChange}
              placeholder="xxx"
            />
            {!isError.securityCode ? (
              <FormHelperText>
                Al reverso de la tarjeta, formato: xxx
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                Codigo de seguridad es requerido.
              </FormErrorMessage>
            )}
          </FormControl>

          <Select
            name="issuer"
            id="form-checkout__issuer"
            // defaultValue={"Seleccione el emisor"}
            placeholder={"Seleccione el emisor"}
          >
            {/* <option value="Seleccione el emisor" disabled>
            Seleccione el emisor
          </option> */}
          </Select>

          <Select
            name="identificationType"
            id="form-checkout__identificationType"
          >
            {/* <option value="" disabled>
            Tipo de documento
          </option> */}
          </Select>

          <FormControl isInvalid={isError.identificationNumber}>
            <FormLabel htmlFor="form-checkout__identificationNumber">
              Numero de documento
            </FormLabel>
            <Input
              id="form-checkout__identificationNumber"
              type="text"
              onChange={handleInputChange}
              placeholder="Sin puntos, ej: 12345678"
            />
            {!isError.identificationNumber ? (
              <FormHelperText>Sin puntos, ej: 12345678</FormHelperText>
            ) : (
              <FormErrorMessage>
                Numero de documento es requerido.
              </FormErrorMessage>
            )}
          </FormControl>
          <Input id="token" type="hidden" />
          <Input id="paymentMethodId" type="hidden" />
          <GridItem
            display={"flex"}
            alignItems="center"
            justifyContent="center"
            gap={4}
          >
            <Button
              type="submit"
              rounded="md"
              id="form-checkout__submit"
              isDisabled={
                isError.cardNumber ||
                isError.cardExpirationMonth ||
                isError.cardExpirationYear ||
                isError.cardholderName ||
                isError.cardholderEmail ||
                isError.securityCode ||
                isError.identificationNumber
              }
            >
              Pagar
            </Button>
            <Button
              rounded="md"
              onClick={() => window.open(plan.init_point)}
              colorScheme="blue"
            >
              Pagar con Mercado Pago
            </Button>
          </GridItem>
        </Grid>

        <Script
          id="MP API"
          defer
          src="https://sdk.mercadopago.com/js/v2"
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          onLoad={() => {
            // console.log("MP API");
            // chargeMP();
            setScript1(true);
          }}
        />
        {script1 && (
          <Script
            id="MP"
            defer
            src="mp.js"
            onLoad={() => {
              // console.log("MP");
            }}
          />
        )}
      </VStack>
    </Box>
  );
};

export default BecomePremium;
