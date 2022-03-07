import { Box, Heading, Flex, Text, Button, Stack, useColorModeValue } from "@chakra-ui/react";

const Stepstwo: React.FC = () => {
 return (
        <Flex
        w={'full'} 
      h={'86vh'}
      mt={"40px"}
      ml={"-100px"}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      color={'white'}
      justifyContent={'center'}
        bg={useColorModeValue('light_grey', 'dark_green')}>
        <Stack direction="row" spacing="70px" >
        <Box
        w= {"600px"}
        h= {"600px"}
        background= {"#F2F1F1"}
        box-shadow= {"rgba(0, 0, 0, 0.25)"}
        border-radius= {"5px"}
        >
                    <Text>-</Text>
          <Button
          color={"white"}
          colorScheme={'green'}
          bg={'green.500'}
          borderRadius={"40px"}
          ml={"270px"}
          >2</Button>
          <Text
          color={"black"}
          fontSize={"12px"}
          ml={"261px"}>
            Confirma
          </Text>
          <Heading>
            <Text color={"black"}
             fontFamily={"Poppins"}
             textAlign={'center'}
             >¿Que necesitas?</Text>
        </Heading>
        <Text color={"black"}
         w={"500px"} 
         textAlign={'center'}
         ml={"50px"}
         >Titulo de la solicitud</Text>
        <Button
        background={"#CCC3C1"}
        borderRadius={"10px"}
        color={"black"}
        ml={"150px"}
        w={"300px"} 
       >
             Ej. Filtraciones de la cocina
            </Button>
            <Text
            color={'red'}
            ml={"210px"} 
            >Elige una categoría</Text>
            <Text>-</Text>
            <Text color={"black"}
         w={"500px"} 
         textAlign={'center'}
         ml={"50px"}
         >Descripción de la solicitud</Text>
                    <Button
        color={"black"}
        ml={"50px"}
        background={"#CCC3C1"}
        borderRadius={"10px"}
        w={"490px"} 
       >
             Ej. Tengo una filtracion en la cocina que debo reparar..
            </Button>
            <Text
            color={'red'}
            ml={"210px"} 
            >Elige una subcategoría</Text>
            <Text>-</Text>
            <Text color={"black"}
         w={"500px"} 
         textAlign={'center'}
         ml={"50px"}
         >Ubicación del servicio</Text>
                    <Button
        color={"black"}
        ml={"150px"}
        background={"#CCC3C1"}
        borderRadius={"10px"}
        w={"290px"} 
       >
             Ubicacion del trabajo
            </Button>
            <Text
            color={'red'}
            ml={"210px"} 
            >Elige una subcategoría</Text>
            <Text>-</Text>
            <Button
              colorScheme={'green'}
              bg={'green.500'}
              borderRadius={"10px"}
              ml={"140px"}   
              w={"300px"}      
              px={6}
              _hover={{
                bg: 'green.600',
              }}>
             Añadir fotos
            </Button>
            <Text>-</Text>
        <Button
              colorScheme={'green'}
              bg={'green.500'}
              borderRadius={"10px"}
              ml={"140px"}   
              w={"300px"}      
              px={6}
              _hover={{
                bg: 'green.600',
              }}>
             Siguiente
            </Button>
            <Text
            color={'green'}
            ml={"240px"} 
            >Paso 2 de 2</Text>
        </Box>
                <Box
        w= {"400px"}
        h= {"600px"}
        background= {"#F2F1F1"}
        box-shadow= {"rgba(0, 0, 0, 0.25)"}
        border-radius= {"5px"}
        >
          <Text>-</Text>
          <Text>-</Text>
          <Text>-</Text>
          <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"15px"}
          >Enviamos tu solicitud a los mejores profesionales de tu zona. Habla con hasta 3 profesionales y elige la opción
          que mas te convenza. ¡Tu solicitud es gratis y sin compromiso!</Text>
           <Text>-</Text>
                    <Text
          color={"green"}
          textAlign={"center"}
          fontSize={"15px"}
          >¿Cúal es nuestro criterio de selección de profesionales?</Text>
           <Text>-</Text>
                    <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"18px"}
          >Profesionales cerca de tu ubicación</Text>
           <Text>-</Text>
                    <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"18px"}
          >Mejor valorados</Text>
           <Text>-</Text>
                    <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"18px"}
          >Respuesta rápida por chat</Text>
           <Text>-</Text>
                    <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"18px"}
          >Profesionales premium</Text>
           <Text>-</Text>
           <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"18px"}
          >Certificado de seguridad</Text>
           <Text>-</Text>
          <Text
          color={"gray"}
          ml={"120px"}
          >--------------------</Text>
           <Text>-</Text>
           <Text>-</Text>
        </Box>
        </Stack>
        </Flex>
    )
  };
  
  export default Stepstwo;