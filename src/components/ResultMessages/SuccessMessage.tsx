import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from '@chakra-ui/icons';

const SuccessMessage: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Tu solicitud fue enviada
      </Heading>
      <Text color={'gray.500'}>
        Ahora puedes ir a tomarte un matecito.
      </Text>
      <Button as='a' href='/' mt='1rem'>Ir a solicitud</Button>
    </Box>
  );
}

export default SuccessMessage;