import {
    Text,
    Box,
    Button,
  } from "@chakra-ui/react";


  const Services: React.FC = () => {
   return (
       <Box>
                  <Text
         color={"#F2F1F1"}
       >-</Text>
       <Text
       ml={"500px"}
       >¿En que podemos ayudarte el dia de hoy?</Text>
       <Text
         color={"#F2F1F1"}
       >-</Text>
       <Button
       ml={"50px"}
       color={"green"}
       colorScheme={'green'}
       bg={'#E1F2DA'}
       rounded={'md'} 
       w={"250px"}      
       px={6}
       _hover={{
         bg: '#D8DDD7',
       }}
       >Plomeria</Button>
       <Button
       ml={"100px"}
       color={"green"}
       colorScheme={'green'}
       bg={'#E1F2DA'}
       rounded={'md'}
       w={"250px"}   
       px={6}
       _hover={{
         bg: '#D8DDD7',
       }}
       >Partido de Futbol</Button>
       <Button
        ml={"100px"}
        color={"green"}
        colorScheme={'green'}
        bg={'#E1F2DA'}
        rounded={'md'}
        w={"250px"}     
        px={6}
        _hover={{
          bg: '#D8DDD7',
        }}
        >Mercado Textil</Button>
       <Button
        ml={"100px"}
        color={"green"}
        colorScheme={'green'}
        bg={'#E1F2DA'}
        rounded={'md'}
        w={"250px"}     
        px={6}
        _hover={{
          bg: '#D8DDD7',
        }}
        >Gasista</Button>
       <Text
         color={"#F2F1F1"}
       >-</Text>
       <Button
        ml={"50px"}
        color={"green"}
        colorScheme={'green'}
        bg={'#E1F2DA'}
        rounded={'md'}
        w={"250px"}       
        px={6}
        _hover={{
          bg: '#D8DDD7',
        }}
        >Tecnico Electricista</Button>
       <Button
        ml={"100px"}
        color={"green"}
        colorScheme={'green'}
        bg={'#E1F2DA'}
        rounded={'md'}
        w={"250px"}       
        px={6}
        _hover={{
          bg: '#D8DDD7',
        }}
        >Profesional IT</Button>
       <Button
        ml={"100px"}
        color={"green"}
        colorScheme={'green'}
        bg={'#E1F2DA'}
        rounded={'md'}
        w={"250px"}       
        px={6}
        _hover={{
          bg: '#D8DDD7',
        }}
        >Albañíl</Button>
       <Button
        ml={"100px"}
        color={"green"}
        bg={'#E1F2DA'}
        rounded={'md'} 
        w={"250px"}       
        px={6}
        _hover={{
          bg: '#D8DDD7',
        }}
        >Delivery</Button>
        <Text
         color={"#F2F1F1"}
       >-</Text>
       </Box>
     )

}


export default Services;