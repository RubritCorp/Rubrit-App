import { Box, Heading, Flex, Text, Button, Stack, useColorModeValue } from "@chakra-ui/react";

const StepsOne: React.FC = () => {
    return (
        <Flex
        w={'full'} 
      h={'80vh'}
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
        h= {"550px"}
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
          >1</Button>
          <Text
          color={"black"}
          fontSize={"12px"}
          ml={"240px"}>
            Describi la tarea
          </Text>
          <Heading>
            <Text color={"black"}
             fontFamily={"Poppins"}
             textAlign={'center'}
             >¿Que necesitas?</Text>
        </Heading>
        <Text>-</Text>
        <Text color={"black"}
         w={"500px"} 
         textAlign={'center'}
         ml={"50px"}
         >Escoge la categoría y subcategoría que necesitas y encuentra los mejores profesionales
        para tu casa. Chatea con 3 profesionales para conseguir un presupuesto. Tu seguridad es muy importante para nosotros,
        Rubrit no dará tu dirección, ni teléfono a ningún profesional.</Text>
        <Text>-</Text>
        <Button
        background={"#CCC3C1"}
        color={"black"}
        ml={"130px"}
        w={"300px"} 
        borderRadius={"10px"}
       >
             Categoria
            </Button>
            <Text
            color={'red'}
            ml={"210px"} 
            >Elige una categoría</Text>
            <Text>-</Text>
                    <Button
        background={"#CCC3C1"}
        color={"black"}
        ml={"130px"}
        w={"300px"} 
        borderRadius={"10px"}
       >
             Subcategoría
            </Button>
            <Text
            color={'red'}
            ml={"200px"} 
            >Elige una subcategoría</Text>
            <Text>-</Text>
        <Button
              colorScheme={'green'}
              bg={'green.500'}
              borderRadius={"10px"}
              ml={"130px"}   
              w={"300px"}      
              px={6}
              _hover={{
                bg: 'green.600',
              }}>
             Siguiente
            </Button>
            <Text
            color={'green'}
            ml={"233px"} 
            >Paso 1 de 2</Text>
        </Box>
                <Box
        w= {"400px"}
        h= {"550px"}
        background= {"#F2F1F1"}
        box-shadow= {"rgba(0, 0, 0, 0.25)"}
        border-radius= {"5px"}
        >
          <Text>-</Text>
          <Text>-</Text>
          <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"20px"}
          >Presupuestos solicitados</Text>
           <Text>-</Text>
                    <Text
          color={"green"}
          textAlign={"center"}
          fontSize={"20px"}
          >143.305</Text>
           <Text>-</Text>
                    <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"20px"}
          >Trabajos completados</Text>
           <Text>-</Text>
                    <Text
          color={"green"}
          textAlign={"center"}
          fontSize={"20px"}
          >1.143.305</Text>
           <Text>-</Text>
                    <Text
          color={"black"}
          textAlign={"center"}
          fontSize={"20px"}
          >Valoracion media de los profesionales</Text>
           <Text>-</Text>
                    <Text
          color={"green"}
          textAlign={"center"}
          fontSize={"20px"}
          >5 / 5</Text>
           <Text>-</Text>
          <Text
          color={"gray"}
          ml={"120px"}
          >--------------------</Text>
           <Text>-</Text>
           <Text>-</Text>
          <Text
          color={"black"}
          textAlign={"center"}>
          ¡Pide presupuesto gratis! Haz una solicitud indicando lo que necesitas, mientras más detalles incluyas
            más fácil será encontrar un profesional que se adapte a ti.
          </Text>
        </Box>
        </Stack>
        </Flex>
    )
    }
  
  export default StepsOne;