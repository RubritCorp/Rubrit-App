// Import external libraries
import {
    Text,
    Box,
    Heading,
    Image,
    Button,
  } from "@chakra-ui/react";

  const Begin: React.FC = () => {
      return (
        <Box
        w= {"1300px"}
        h= {"480px"}
        ml={"60px"}
        background= {"#F2F1F1"}
        box-shadow= {"rgba(0, 0, 0, 0.25)"}
        border-radius= {"5px"}
        >
            <Text
            color={"#F2F1F1"}>-</Text>
<Heading
ml={"320px"}>
¿Estas preparado para comenzar?
</Heading>
<Image
ml={"270px"}
src="https://i.pinimg.com/originals/f6/d0/8c/f6d08c8949f9f18f2075ea095bee3c7a.jpg"
></Image>
        <Button
              colorScheme={'green'}
              bg={'green.500'}
              rounded={'md'}
              ml={"480px"}   
              w={"300px"}      
              px={6}
              _hover={{
                bg: 'green.600',
              }}>
             Empecemos
            </Button>
        </Box>
      )
      
}

export default Begin;