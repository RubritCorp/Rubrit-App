import Script from "next/script";
//form
import {
  Box,
  Button,
  Flex,
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
  Text,
  Heading,
  ChakraProps,
  ChakraComponent,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NextPage } from "next";
import { CheckCircle } from "phosphor-react";

const BecomePremium: NextPage = () => {
  const [input, setInput] = useState({
    cardNumber: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    cardholderName: "",
    cardholderEmail: "",
    securityCode: "",
    identificationNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log("handle", value);
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
  const Feature: React.FC<{ title: string; desc: string }> = ({
    title,
    desc,
  }) => {
    return (
      <Box p={8} shadow="md" borderWidth="1px">
        <Heading fontSize="l">{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    );
  };

  return (
    <Box alignItems={"flex-start"} width={"100%"} minH={"100%"}>
      <VStack spacing={4} align="stretch">
        <VStack spacing={4} marginTop="10px">
          <Heading fontSize="xl" color={"medium_green"}>
            ¿Porque ser Premium?
          </Heading>
          <List spacing={3}>
            {/* <ListItem>
              <Feature
                title="Plan Money"
                desc="The future can be even brighter but a goal without a plan is just a wish"
              />
            </ListItem> */}
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
          </GridItem>
        </Grid>

        <Script
          id="MP API"
          src="https://sdk.mercadopago.com/js/v2"
          strategy="beforeInteractive"
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          onLoad={() => {
            console.log("code here");
          }}
        />

        <Script
          id="mp"
          strategy="lazyOnload"
          onError={(e) => {
            console.error("Script failed to load", e);
          }}
          // strategy="lazyOnload"
          onLoad={() => {
            console.log("code here");
          }}
        >
          {`
        const mp = new MercadoPago('APP_USR-8ac18576-c585-4bfe-be23-e79462e260c4');
        // Step #getIdentificationTypes
        
        // Helper function to append option elements to a select input
        function createSelectOptions(elem, options, labelsAndKeys = { label : "name", value : "id"}){
           const {label, value} = labelsAndKeys;
        
           elem.options.length = 0;
        
           const tempOptions = document.createDocumentFragment();
        
           options.forEach( option => {
               const optValue = option[value];
               const optLabel = option[label];
        
               const opt = document.createElement('option');
               opt.value = optValue;
               opt.textContent = optLabel;
        
               tempOptions.appendChild(opt);
           });
        
           elem.appendChild(tempOptions);
        }
        
        // Get Identification Types
        (async function getIdentificationTypes () {
           try {
               const identificationTypes = await mp.getIdentificationTypes();
               const identificationTypeElement = document.getElementById('form-checkout__identificationType');
        
               createSelectOptions(identificationTypeElement, identificationTypes)
           }catch(e) {
               return console.error('Error getting identificationTypes: ', e);
           }
        })()
        
        // Step #getPaymentMethods
        const cardNumberElement = document.getElementById('form-checkout__cardNumber');
        
        function clearHTMLSelectChildrenFrom(element) {
            const currOptions = [...element.children];
            currOptions.forEach(child => child.remove());
        }
        
        cardNumberElement.addEventListener('keyup', async () => {
           try {
               const paymentMethodElement = document.getElementById('paymentMethodId');
               const issuerElement = document.getElementById('form-checkout__issuer');
              //  const installmentsElement = document.getElementById('form-checkout__installments');
               let cardNumber = cardNumberElement.value;
        
               if (cardNumber.length < 6 && paymentMethodElement.value) {
                   clearHTMLSelectChildrenFrom(issuerElement);
                  //  clearHTMLSelectChildrenFrom(installmentsElement);
                   paymentMethodElement.value = "";
                   return
               }
        
               if (cardNumber.length >= 6 && !paymentMethodElement.value) {
                   let bin = cardNumber.substring(0,6);
                   const paymentMethods = await mp.getPaymentMethods({'bin': bin});
        
                   const { id: paymentMethodId, additional_info_needed, issuer } = paymentMethods.results[0];
        
                   // Assign payment method ID to a hidden input.
                   paymentMethodElement.value = paymentMethodId;
        
                   // If 'issuer_id' is needed, we fetch all issuers (getIssuers()) from bin.
                   // Otherwise we just create an option with the unique issuer and call getInstallments().
                   additional_info_needed.includes('issuer_id') ? getIssuers() : (() => {
                       const issuerElement = document.getElementById('form-checkout__issuer');
                       createSelectOptions(issuerElement, [issuer]);
          
                      //  getInstallments();
                   })()
               }
           }catch(e) {
               console.error('error getting payment methods: ', e)
           }
        });
        
        // Step #getIssuers
        const getIssuers = async () => {
           try {
               const cardNumber = document.getElementById('form-checkout__cardNumber').value;
               const paymentMethodId = document.getElementById('paymentMethodId').value;
               const issuerElement = document.getElementById('form-checkout__issuer');
        
               const issuers = await mp.getIssuers({paymentMethodId, bin: cardNumber.slice(0,6)});
        
               createSelectOptions(issuerElement, issuers);
        
              //  getInstallments();
           }catch(e) {
               console.error('error getting issuers: ', e)
           }
        };
        
        // // Step #getInstallments
        // const getInstallments = async () => {
        //    try {
        //        const installmentsElement = document.getElementById('form-checkout__installments')
        //        const cardNumber = document.getElementById('form-checkout__cardNumber').value; 
        
        //        const installments = await mp.getInstallments({
        //            amount: document.getElementById('transactionAmount').value,
        //            bin: cardNumber.slice(0,6),
        //            paymentTypeId: 'credit_card'
        //        });
        
        //        createSelectOptions(installmentsElement, installments[0].payer_costs, {label: 'recommended_message', value: 'installments'})
        //    }catch(e) {
        //        console.error('error getting installments: ', e)
        //    }
        // }
        
        // Step #createCardToken
        const formElement = document.getElementById('form-checkout');
        formElement.addEventListener('submit', e => createCardToken(e));
        
        const createCardToken = async (event) => {
           try {
               const tokenElement = document.getElementById('token');
        
               if (!tokenElement.value) {
                   event.preventDefault();
        
                   const token = await mp.createCardToken({
                       cardNumber: document.getElementById('form-checkout__cardNumber').value,
                       cardholderName: document.getElementById('form-checkout__cardholderName').value,
                       identificationType: document.getElementById('form-checkout__identificationType').value,
                       identificationNumber: document.getElementById('form-checkout__identificationNumber').value,
                       securityCode: document.getElementById('form-checkout__securityCode').value,
                       cardExpirationMonth: document.getElementById('form-checkout__cardExpirationMonth').value,
                       cardExpirationYear: document.getElementById('form-checkout__cardExpirationYear').value
                   });
        
                   tokenElement.value = token.id;
                   console.log("token",token.id)
                   //formElement.requestSubmit();
                  // const email = document.getElementById('form-checkout__cardholderEmail').value
                  // const res = await fetch("http://localhost:8080/subs/payer", {
                  //   method: "POST",
                  //   headers: {
                  //     "Content-Type": "application/json",
                  //   },
                  //   body: JSON.stringify({
                  //     card_token_id: tokenElement.value,
                  //     payer_email: email
                  //   }),
                  // });
                  // const data = await res.json()
               }
        
          }catch(e) {
            console.error('error creating card token: ', e)
            alert("Error al crear token")

           }
        }
    `}
        </Script>
      </VStack>
    </Box>
  );
};

export default BecomePremium;
