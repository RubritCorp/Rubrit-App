import Layout from "components/layout";
import Head from "next/head";
import Script from "next/script";
import Navbar from "components/NavBar";
import Footer from "components/Footer";
import nextConfig from "../../../next.config.js";
//form
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputControl } from "formik-chakra-ui";
import React, { useState } from "react";
import { text } from "stream/consumers";
import axios from "axios";

const Subscriptions = () => {
  const [input, setInput] = useState({
    cardNumber: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    cardholderName: "",
    cardholderEmail: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log("handle", value);
    setInput({ ...input, [id]: value });
  };

  const isError = {
    cardNumber: input.cardNumber === "",
    cardExpirationMonth: input.cardExpirationMonth === "",
    cardExpirationYear: input.cardExpirationYear === "",
    cardholderName: input.cardholderName === "",
    cardholderEmail: input.cardholderEmail === "",
  };

  // const inputs =[
  //   {id:"cardNumber",type:"text",text: "Ingrese el numero de tarjeta.",error:"Numero de tarjeta es requerido"}
  // ]
  // const inputGenerator=(id:string, type:string,text:string, error:string)=>{
  //   return <FormControl isInvalid={isError[id]}>
  //   <FormLabel htmlFor="cardNumber">Email</FormLabel>
  //   <Input id="cardNumber" type="text" onChange={handleInputChange} />
  //   {!isError ? (
  //     <FormHelperText>{text}</FormHelperText>
  //   ) : (
  //     <FormErrorMessage>{error} </FormErrorMessage>
  //   )}
  // </FormControl>
  // }
  const handleClick = () => {
    var bodyFormData = new FormData();
    var imagefile: any = document.querySelector("#file");
    bodyFormData.append("file", imagefile.files[0]);
    bodyFormData.append("path", `users`);
    bodyFormData.append("title", `archivo.jpg`);
    axios({
      method: "post",
      url: "http://localhost:8080/aws/upload-file",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };
  return (
    <Box>
      <input type="file" id="file" />
      <button onClick={handleClick}>img</button>
      <form id="form-checkout">
        <FormControl isInvalid={isError.cardNumber}>
          <FormLabel htmlFor="cardNumber">Numero de tarjeta</FormLabel>
          <Input
            id="cardNumber"
            type="text"
            onChange={handleInputChange}
            placeholder="xxxx-xxxx-xxxx-xxxx"
          />
          {!isError.cardNumber ? (
            <FormHelperText>Formato xxxx-xxxx-xxxx-xxxx.</FormHelperText>
          ) : (
            <FormErrorMessage>Numero de tarjeta es requerido.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isError.cardExpirationMonth}>
          <FormLabel htmlFor="cardNumber">Mes de vencimiento</FormLabel>
          <Input
            id="cardExpirationMonth"
            type="text"
            onChange={handleInputChange}
            placeholder="xx"
          />
          {!isError.cardExpirationMonth ? (
            <FormHelperText>Formato xx</FormHelperText>
          ) : (
            <FormErrorMessage>
              Numero de vencimiento es requerido.
            </FormErrorMessage>
          )}
        </FormControl>
        <input id="token" name="token" type="hidden" />
        <input id="paymentMethodId" name="paymentMethodId" type="hidden" />
        <button type="submit" id="form-checkout__submit">
          Pagar
        </button>
      </form>

      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="beforeInteractive"
      />

      <Script
        id="mp"
        strategy="lazyOnload"
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
        const cardNumberElement = document.getElementById('cardNumber');
        
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
               const cardNumber = document.getElementById('cardNumber').value;
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
        //        const cardNumber = document.getElementById('cardNumber').value; 
        
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
                       cardNumber: document.getElementById('cardNumber').value,
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

                  const email = document.getElementById('form-checkout__cardholderEmail').value
                  const res = await fetch("http://localhost:8080/subs/payer", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      card_token_id: tokenElement.value,
                      payer_email: email
                    }),
                  });

                  const data = await res.json()
                  console.log("success", data)
               }
        
           }catch(e) {
               console.error('error creating card token: ', e)
           }
        }
    `}
      </Script>
    </Box>
  );
};

export default Subscriptions;
