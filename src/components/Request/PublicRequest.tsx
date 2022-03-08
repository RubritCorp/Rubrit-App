import {
  Box,
  Heading,
  Flex,
  Text,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import { Formik } from 'formik';
import { SubmitButton } from 'formik-chakra-ui';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { StepOneFields, StepTwoFields } from './Fields';
import { initialValues, validationSchema, handleSubmit } from './newPublicServiceRequestHelper';

const PublicRequest: React.FC = () => {
  return (
    <Flex
        w='full'
        justifyContent='center'
        flexWrap='wrap-reverse'
        gap='40px'
      >
        <PublicRequestMain />
        <PublicRequestSide />
      </Flex>
  )
}

const PublicRequestMain: React.FC = () => {
  const [ isRequestSuccessful, setIsRequestSuccessful ] = useState<null | boolean>(null)
  const { isOpen, onToggle } = useDisclosure();
  const { data: session, status } = useSession();

  async function preSubmit(event: any, values: any) {
    event.preventDefault();
    if (session && status === "authenticated") {  
      const { success } = await handleSubmit(values);
      setIsRequestSuccessful(success);
    } else {
      document.getElementById('signInButton')?.click();
    } 
  }

  function showCurrentStep() {
    let CurrentComponent;
    if (isRequestSuccessful === null) {
      // Render component when form is not sent yet
      !isOpen ? CurrentComponent = <StepOneFields /> : CurrentComponent = <StepTwoFields />
    } else if (isRequestSuccessful === true) {
      CurrentComponent = <SuccessMessage />
    } else {
      CurrentComponent = <ErrorMessage />
    }

    return CurrentComponent
  }

  function showCurrentButtons(values: any, isSubmitting: boolean, errors: any) {
    if (isRequestSuccessful === null) {
      return (
        <>
          <Button
            bg='green.500'
            rounded='full'
            _hover={{
              bg: 'green.600',
            }}
            disabled={
              values.category === '' || values.subcategory === ''
            }
            onClick={onToggle}
          >
            { !isOpen ? 'Siguiente' : 'Atrás' }
          </Button>
          <SubmitButton
            isLoading={isSubmitting}
            color='white'
            alignSelf='center'
            bg='green.500'
            rounded='full'
            px={6}
            _hover={{
              bg: 'green.600',
            }}
            display={ !isOpen ? 'none' : 'inherit'}
            disabled={
              Object.keys(errors).length > 0 || isSubmitting
            }
            >
            Enviar solicitud
          </SubmitButton>
        </>
      )
    } else {
      return null
    }
  }

  return (
      <Stack
        alignItems='center'
        justifyContent='space-between'
        gap='2rem'
        padding='20px 25px'
        flex='2'
        bg={useColorModeValue('gray.300', 'gray.900')}
        color={useColorModeValue('black', 'white')}
        boxShadow='rgba(0, 0, 0, 0.25)'
        borderRadius='15px'
        textAlign='center'
      >
        <Heading display={ isRequestSuccessful !== null ? 'none' : 'inherit'}>
          <Text>¿Qué necesitas?</Text>
        </Heading>
        <Box display={ isRequestSuccessful !== null ? 'none' : 'block'}>
          <Text>Tu seguridad es muy importante para nosotros.</Text>
          <Text>Rubrit no dará tu dirección ni teléfono a ningún profesional.</Text>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={preSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, values, isSubmitting }) => (
            <>
              <Box as='form' w='100%' onSubmit={(e: React.SyntheticEvent): Promise<void> => preSubmit(e, values)}>
                <Stack py='15px'>
                  { showCurrentStep() }
                </Stack>
                <Flex gap='1rem' justifyContent='center' py='1rem'>
                  { showCurrentButtons(values, isSubmitting, errors) }
                </Flex>
              </Box>
            </>
          )}
        </Formik>
      </Stack>
  )
}

const PublicRequestSide: React.FC = () => {
  return (
    <Stack
        flex='1'
        gap='2rem'
        padding='20px 25px'
        bg={useColorModeValue('gray.300', 'gray.900')}
        color={useColorModeValue('black', 'white')}
        boxShadow='rgba(0, 0, 0, 0.25)'
        borderRadius='15px'
        h='full'
        alignSelf='flex-end'
        textAlign='center'
      >
        <Heading>Rubrit stats</Heading>
        <Stack>
          <Heading as='h3' size='md'>Presupuestos solicitados</Heading>
          <Text>1,492</Text>
        </Stack>
        <Stack>
          <Heading as='h3' size='md'>Trabajos completados</Heading>
          <Text>3,498</Text>
        </Stack>
        <Stack>
          <Text fontSize='sm'>
            ¡Pide presupuesto gratis! Haz una solicitud indicando lo que necesitas, mientras más detalles incluyas más fácil será encontrar un profesional que se adapte a ti.
          </Text>
        </Stack>
      </Stack>
  );
}

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

export default PublicRequest;