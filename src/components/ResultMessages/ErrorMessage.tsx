import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';


const ErrorMessage: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Ocurrió un error
      </Heading>
      <Text color={'gray.500'}>
        Algo salió mal. Por favor vuelve a intentarlo.
      </Text>
      <Button as='a' href='/request/new' mt='1rem'>Regresar</Button>
    </Box>
  );
}

export default ErrorMessage;