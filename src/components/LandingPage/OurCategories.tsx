import { Flex, chakra, useColorModeValue, Box, SimpleGrid, Avatar, WrapItem } from "@chakra-ui/react";

import { useCategories } from "Provider/CategoriesProvider";
import { ReactChild, ReactFragment, ReactPortal } from "react";



const OurCategories: React.FC = () => {

  const { categories } = useCategories();
  console.log(categories);

  const Feature = (props:{ src: string; color: any; title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
    return (
      <Box
     

      >
        <Flex
          alignItems="center"
          justifyContent="center"
          w={10}
          h={10}
          mb={4}
          rounded="full"
          color={useColorModeValue(`${props.color}.600`, `${props.color}.100`)}
          bg={useColorModeValue(`${props.color}.100`, `${props.color}.600`)}
        >
        <WrapItem> 
          <Avatar
            boxSize={"90%"}
            bg={useColorModeValue(`${props.color}.600`, `${props.color}.100`)}
            src={props.src}
          />
          </WrapItem>  
        </Flex>
        <chakra.h3
          mb={2}
          fontWeight="semibold"
          lineHeight="shorter"
          color={useColorModeValue("gray.900", "gray.100")}
        >
          {props.title}
        </chakra.h3>
        <chakra.p
          maxH={20}
          overflow={"auto"}
          fontSize="sm"
          color={useColorModeValue("gray.500", "gray.400")}
          css={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
            '&::-webkit-scrollbar-track': {
              width: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: "#38a169",
              borderRadius: '24px',
            },
          }}
        >
          {props.children}
        </chakra.p>
      </Box>
    );
  };
  return (
    <Flex
      
      p={10}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box
       maxW={"container.xl"}
      maxH={"700px"}
      overflow={"auto"}
      css={{
        '&::-webkit-scrollbar': {
          width: '0px',
        },
        '&::-webkit-scrollbar-track': {
          width: '15px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: "#38a169",
          borderRadius: '24px',
        },
      }}
        
        py={20}
        mx="auto"
    
       
      >
        <Box textAlign={{ lg: "center" }}>
          <chakra.p
            mt={2}
            fontSize={{ base: "3xl", sm: "4xl" }}
            lineHeight="8"
            fontWeight="extrabold"
            letterSpacing="tight"
            color={useColorModeValue("gray.900", "white")}
          >
            Nuestras Categorias
          </chakra.p>
          <chakra.p
            mt={4}
            maxW="2xl"
            fontSize="xl"
            mx={{ lg: "auto" }}
            color={useColorModeValue("gray.500", "gray.400")}
          >
            Podes elegir entre mas de 35 categorias para encontrar el trabajo que mas se ajusta a tus necesidades.
          </chakra.p>
        </Box>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacingX={{ base: 16, lg: 24 }}
          spacingY={20}
          mt={6}
        >

          {categories.map((category, index) => (

            <Feature
              key={index}
              color="grey"
              title={category.name}
              src={category.icon}
            >
              {category.description}
            </Feature>
          )
          )
          }




        </SimpleGrid>
      </Box>
    </Flex>
  );
}


export default OurCategories;
