// Import external libraries
import {
  Box,
  Heading,
  Button,
  Container,
  SimpleGrid,
  Divider,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  DrawerHeader,
  Flex,
  Stack,
  Text,

} from "@chakra-ui/react";
import people from "assets/people";
import workers from "assets/workers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Binoculars, Wrench } from "phosphor-react";


const Begin: React.FC = () => {
  const { status } = useSession()
  const router = useRouter()
  const { isOpen: isOpenOne, onOpen: onOpenOne, onClose: onCloseOne } = useDisclosure()


  return (
    <Container maxW={"container.xl"} centerContent p={10} >

      <Container maxW={"container.xl"}>
        <Box paddingBottom={20}>
          <Center>
            <Heading>
              ¿Estas preparado/a para comenzar?
            </Heading>
          </Center>
        </Box>
      </Container>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacingY='40px'>
        <Container centerContent>
          <Box >
            <Center>
              <Heading color={"green.400"} size='lg'>¿Buscas profesionales?</Heading>
            </Center>
            <Box paddingTop={10} h={"400px"}>
              {workers}
            </Box>
          </Box>
        </Container>
        <Container centerContent padding='0px 0px' w={"100px"}  >


          <Divider orientation='vertical' />


        </Container>

        <Container centerContent>
          <Box  >
            <Center>
              <Heading color={"green.400"} as='h4' size='lg'>¿Buscas clientes?</Heading>
            </Center>
            <Box paddingTop={10} h={"395px"}>
              {people}
            </Box>
          </Box>
        </Container>
      </SimpleGrid>

      <Button
        marginTop={20}
        color={"white"}
        bg={'green.500'}
        rounded={'md'}
        px={20}
        _hover={{
          bg: 'green.600',
        }}

        onClick={() => {
          status === "authenticated" ? (
            onOpenOne()
          ) : (
            router.push('/?login=true')
          )
        }}
      >
        Empecemos
      </Button>
      <Modalcomp onCloseOne={onCloseOne} isOpenOne={isOpenOne} />
    </Container>
  )

}

const Modalcomp: React.FC<{ onCloseOne(): void, isOpenOne: boolean }> = ({ onCloseOne, isOpenOne }) => {
  const router = useRouter()
  return (
    <>
      <Modal size={"lg"} onClose={onCloseOne} isOpen={isOpenOne} isCentered>
        <ModalOverlay />
        <ModalContent>

          <ModalCloseButton />
          <ModalBody>
            <DrawerHeader>
              <Stack
                align={'center'}
                spacing={{ md: 8 }}
                py={{ base: 10, md: 10 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                  <Center>
                    <Heading
                      lineHeight={1.3}
                      fontWeight={600}
                      fontSize='4xl'
                    >
                      <Text
                        as={'span'}
                        position={'relative'}
                        _after={{
                          content: "''",
                          width: 'full',
                          height: '30%',
                          position: 'absolute',
                          bottom: 1,
                          left: 0,
                          bg: 'green.400',
                          zIndex: -1,
                        }}>
                        Bienvenido/a
                      </Text>
                      <br />
                      <Text color={'green.400'}>
                        Somos Rubrit!
                      </Text>
                    </Heading>
                  </Center>
                  <Text color={'gray.500'}>
                    Rubrit es una plataforma que te permite encontrar y ofrecer servicios de manera rápida y segura. Estas listo/a para empezar ?
                  </Text>
                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={{ base: 'column', sm: 'row' }}>
                    <Button
                      maxW={{lg:"44%"}}
                      rounded={'md'}
                      size={'md'}
                      color={'white'}
                      fontWeight={'semibold'}
                      bg={'green.500'}
                      _hover={{ bg: "green.400" }}
                      onClick={() => router.push('/findServices')}
                      rightIcon={<Binoculars size={32} color="white" />} 
                    >
                      Buscar servicios
                    </Button>
                    <Button
                    maxW={{lg:"44%"}}
                      rounded={'md'}
                      size={'md'}
                      fontWeight={"semibold"}
                      color={'white'}
                      bg={'green.500'}
                      _hover={{ bg: "green.400" }}
                      onClick={() => router.push('/offerServices')}
                      rightIcon={<Wrench size={32} color="white" />} 
                    >
                      Ofrecer Servicios
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </DrawerHeader>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Begin;
