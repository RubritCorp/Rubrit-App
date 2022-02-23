import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Divider,
    Select,
    Box,
    Button,
    Avatar,
    Center,
} from '@chakra-ui/react';


import { ReactElement } from 'react';
interface FeatureProps {
    text: string;
    iconBg: string;
    icon?: ReactElement;
}


//native libraries
import Link from "next/link";
//componentes
import Layout from "../layout";
import { AddressBook, CalendarCheck, CircleWavyCheck, CreditCard, ListChecks, PersonSimpleRun, SignIn, Star, UserList } from 'phosphor-react';
//styles


const Offerservices: React.FC = () => {
    return (
        <Layout>
            <Container maxW={'5xl'} py={12}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Flex>
                        <Image
                            rounded={'md'}
                            alt={'feature image'}
                            src={
                                'https://homesolution.net/blog/wp-content/uploads/2019/01/IMG_5613.jpg'
                            }
                            objectFit={'cover'}
                        />
                    </Flex>
                    <Stack spacing={4}>
                        <Heading>Aumenta tus clientes a traves nuestro</Heading>
                        <Text color={'gray.500'} fontSize={'lg'}>
                            Subscribite en nuestra pagina y empeza a ver el cambio en tu lista de clientes
                        </Text>
                        <Stack
                            spacing={4}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue('gray.100', 'gray.700')}
                                />
                            }>
                            <Heading fontSize={"s"}>Selecciona tu provincia</Heading>
                            <Select
                                size='lg'
                                bg='green.100'
                                borderColor='green.100'
                                color='green.900'
                                placeholder='Selecciona tu ciudad'
                            />
                            <Heading fontSize={"s"}>Selecciona tu ciudad</Heading>
                            <Select
                                size='lg'
                                bg='green.100'
                                borderColor='green.100'
                                color='green.900'
                                placeholder='Selecciona tu servicio'
                            />
                            <Heading fontSize={"s"}>Aumenta tus clientes a traves nuestro</Heading>
                            <Select
                                size='lg'
                                bg='green.100'
                                borderColor='green.100'
                                color='green.900'
                                placeholder='Selecciona una subcategoria'
                            />
                        </Stack>

                    </Stack>
                </SimpleGrid>
                <Stack
                    py={10}
                    direction={'column'}
                    spacing={3}
                    align={'center'}
                    alignSelf={'center'}
                    position={'relative'}>
                    <Button
                        colorScheme={'green'}
                        bg={'green.400'}
                        rounded={'md'}
                        px={20}
                        _hover={{
                            bg: 'green.500',
                        }}>
                        EMPECEMOS
                    </Button>
                    <Stack
                        py={10}
                        direction={"row"}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={"absolute"}>
                        <Text fontSize={'sm'}>
                            ¿YA TENES UNA CUENTA?
                        </Text>
                        <Button variant={'link'} colorScheme={'green'} size={'sm'}>
                            SIGN UP
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            <Divider />
            <Stack
                py={10}
                spacing={4}
            >
                <Container py={2} maxW={'5xl'} >


                    <Stack
                        align={'center'}
                        alignSelf={'center'}
                        spacing={3}>
                        <Heading>POSTULATE Y ENCONTRA TRABAJO</Heading>
                        <Text align={"center"} color={'gray.500'} fontSize={'lg'}>
                            En nuestra pagina vas a poder postularte y llegar a miles de personas que se encuentran en tu ciudad en busca de tus cualidades
                        </Text>
                    </Stack>
                </Container>
            </Stack>

            <Container maxW={'5xl'} py={2}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <ListChecks size={40} color="#6bdaae" />
                        <Heading fontSize={"lg"}>SE TU PROPIO JEFE</Heading>
                        <Text>
                            Vas a poder ofrecerte seun el trabajo que realices. Manejar tu agenda a gusto. Hacerlo como y cuando quieras segun lo acordado con el cliente
                        </Text>
                    </Stack>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <AddressBook size={40} color="#6bdaae" />
                        <Heading fontSize={"lg"}>LISTA DE CLIENTES</Heading>
                        <Text>
                            Tu lista de clientes crecera de sobre manera gracias a la cantidad de gente a la cual vas a poder ofrecerte.
                        </Text>
                    </Stack>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Stack
                            direction={"row"}
                            spacing={3}
                        >
                            <Star size={40} color="#ffea00" weight="duotone" />
                            <Star size={40} color="#ffea00" weight="duotone" />
                            <Star size={40} color="#ffea00" weight="duotone" />
                            <Star size={40} color="#ffea00" weight="duotone" />
                            <Star size={40} color="#ffea00" weight="duotone" />
                        </Stack>
                        <Heading fontSize={"lg"}>SISTEMA DE ESTRELLAS</Heading>
                        <Text>
                            Las personas que te contraten van a poder calificar tus trabajos, esto va a permitir que te destaques sobre el resto por hacerlo de la mejor manera.
                        </Text>
                    </Stack>
                </SimpleGrid>
            </Container>
            <Divider p={4} />
            <Stack
                py={10}
                spacing={4}
            >
                <Container
                    maxW={'5xl'}
                    centerContent
                >
                    <Stack
                        spacing={4}
                    >
                        <Heading>¿COMO EMPEZAR?</Heading>

                    </Stack>
                </Container>
            </Stack>

            <Container maxW={'5xl'} py={2}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <SignIn size={50} color="#6bdaae" weight="duotone" />
                        <Heading fontSize={"lg"}>1. Sign Up</Heading>
                        <Text>
                            Primero que nada te logueas en nuestra aplicacion.
                        </Text>
                    </Stack>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <UserList size={50} color="#6bdaae" />
                        <Heading fontSize={"lg"}> 2. Construi tu perfil</Heading>
                        <Text>
                            selecciona los oficios que sabes hacer.
                        </Text>
                    </Stack>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Stack
                            direction={"row"}
                            spacing={3}
                        >
                            <CircleWavyCheck size={50} color="#6bdaae" />
                        </Stack>
                        <Heading fontSize={"lg"}> 3. Verifica tu identidad</Heading>
                        <Text>
                            Confirma que sos vos quien se esta subscribiendo.
                        </Text>
                    </Stack>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <CreditCard size={50} color="#6bdaae" />
                        <Heading fontSize={"lg"}>4. Paga por unica vez </Heading>
                        <Text>
                            Pagas una pequeña subscripcion de  $500  que nos ayuda a brindarte el mejor servicio.
                        </Text>
                    </Stack>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <CalendarCheck size={50} color="#6bdaae" />
                        <Heading fontSize={"lg"}>5. Setea tu calendario</Heading>
                        <Text>
                            Nos indicas cuales son los dias y horarios en los cuales estas disponible para trabjar.
                        </Text>
                    </Stack>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Stack
                            direction={"row"}
                            spacing={3}
                        >
                            <PersonSimpleRun size={50} color="#6bdaae" />
                        </Stack>
                        <Heading fontSize={"lg"}>6. Empeza a trabajar </Heading>
                        <Text>
                            Una vez que hayas completados los pasos anteriores ya estas listo/a para empezar a recibir ofertas.
                        </Text>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Divider p={8} />
            <Stack
                py={10}
                spacing={3}
            >
                <Container
                    maxW={'5xl'}
                    centerContent
                >
                    <Heading>¿QUE DICEN LOS RUBRITS?</Heading>
                </Container>
            </Stack>



            <Container maxW={'5xl'} py={2}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <Stack
                        spacing={2}
                    >
                        <Center py={6}>
                            <Box
                                maxW={'350px'}
                                w={'full'}
                                bg={useColorModeValue('white', 'gray.900')}
                                boxShadow={'2xl'}
                                rounded={'md'}
                                p={6}
                                overflow={'hidden'}>
                                <Box
                                    h={'210px'}
                                    bg={'gray.100'}
                                    mt={-6}
                                    mx={-6}
                                    mb={6}
                                    pos={'relative'}>
                                    <Image
                                        src={
                                            'https://homesolution.net/blog/wp-content/uploads/2019/02/gasista.jpg'
                                        }
                                        alt="Gasista"
                                        objectFit={"fill"}
                                        w={'full'}
                                        h={'full'}
                                    />
                                </Box>
                                <Stack>

                                    <Text color={'green.500'}>
                                        “ HENRY PROS ME PERMTIO EMPEZAR A TRABAJAR MAS ORDENADAMENTE GRACIAS A SU AGENDA  ”
                                    </Text>
                                </Stack>
                                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                                    <Avatar
                                        src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}

                                    />
                                    <Stack direction={'column'} spacing={0}>
                                        <Text fontSize={'lg'} fontWeight={600}>Rodolfo perez</Text>
                                        <Text fontSize={'xs'} color={'gray.500'}>Calamuchita - Cordoba</Text>
                                        <Text color={'gray.500'}>Soy gasista de la cuna hasta al cajon. Gasista se nace, no se hace.  </Text>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Center>
                    </Stack>
                    <Stack
                        spacing={2}
                    >
                        <Center py={6}>
                            <Box
                                maxW={'350px'}
                                w={'full'}
                                bg={useColorModeValue('white', 'gray.900')}
                                boxShadow={'2xl'}
                                rounded={'md'}
                                p={6}
                                overflow={'hidden'}>
                                <Box
                                    h={'210px'}
                                    bg={'gray.100'}
                                    mt={-6}
                                    mx={-6}
                                    mb={6}
                                    pos={'relative'}>
                                    <Image
                                        src={
                                            'https://cimacnoticias.com.mx/wp-content/uploads/2016/05/carpintera01citlallilopez.jpg'
                                        }
                                        alt="Gasista"
                                        objectFit={"fill"}
                                        w={'full'}
                                        h={'full'}
                                    />
                                </Box>
                                <Stack>

                                    <Text color={'green.500'}>
                                        “ NO ME ALCANZA EL DIA PARA CUBRIR LA CANTIDAD DE CLIENTES QUE PUEDO LLEGAR A TENER ”
                                    </Text>
                                </Stack>
                                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                                    <Avatar
                                        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxFXIGrIzfbyYSt2fCmV21rAoo6yLv8K0cQ&usqp=CAU'}

                                    />
                                    <Stack direction={'column'} spacing={0}>
                                        <Text fontSize={'lg'} fontWeight={600}>Carolina Teraz</Text>
                                        <Text fontSize={'xs'} color={'gray.500'}>Rosario - Santa Fe </Text>
                                        <Text color={'gray.500'}>Carpintera que heredo la  pasion de su papa desde muy chica. </Text>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Center>
                    </Stack>
                </SimpleGrid>
            </Container>

        </Layout>
    );
};

export default Offerservices;