//Style library
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
    IconButton,
} from '@chakra-ui/react';


import { useState } from 'react';

import Slider from 'react-slick';
//native libraries

//componentes
import Layout from "../layout";
//icons
import { AddressBook, CalendarCheck, CircleWavyCheck, CreditCard, ListChecks, PersonSimpleRun, SignIn, Star, UserList, ArrowLeft, ArrowRight } from 'phosphor-react';

const whatTheySay = [
    {
        image: "https://homesolution.net/blog/wp-content/uploads/2019/02/gasista.jpg",
        name: "Rodolfo Perez",
        city: "Calamuchita",
        province: "Cordoba",
        opinion: "RUBRIT ME PERMTIO EMPEZAR A TRABAJAR MAS ORDENADAMENTE GRACIAS A SU AGENDA",
        avatar: "https://avatars0.githubusercontent.com/u/1164541?v=4",
        whoYouAre: "Soy gasista de la cuna hasta al cajon. Gasista se nace, no se hace.",
    },
    {
        image: "https://cimacnoticias.com.mx/wp-content/uploads/2016/05/carpintera01citlallilopez.jpg",
        name: "Gabriela Perez",
        city: "Rosario",
        province: "Santa Fe",
        opinion: "RUBRIT ME PERMITIO AUMENTAR MI CARTERA DE CLIENTES AL DOBLE DE LO QUE TENIA ANTES",
        avatar: "https://static.vecteezy.com/system/resources/previews/001/158/381/non_2x/portrait-of-a-focused-female-carpenter-hard-at-work-photo.jpg",
        whoYouAre: "Herede la pasion por el oficio de la carpinteria de mi papa desde muy chica",
    },
    {
        image: "https://www.avanzaentucarrera.com/orientacion/comp/uploads/2017/03/soldador.jpg",
        name: "Roman Nuñez",
        city: "Toay",
        province: "La Pampa",
        opinion: "RUBRIT ME CAMBIO LA VIDA, EN MI ANTIGUO TRABAJO ME EXPLOTABAN, ESTOY FELIZ",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStwpI95Iv1CZt28y1SXtMTWv5ky1IRTyG6hw&usqp=CAU",
        whoYouAre: "Soy soldador gracias a un amigo que me invito a tomar unos cursos de soldadura",
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbtI-Q1GY_zuR8rWplvkVW5xnxJN3TeMhIlQ&usqp=CAU",
        name: "romina paez",
        city: "Capital Federal",
        province: "Buenos Aires",
        opinion: "A TRAVEZ DE MIS BUENAS CALIFICACIONES EN RUBRIT, ME HICE CONOCER A MUCHOS CLIENTES",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA-Sj-ohJS3J6K-LeRdQ5Vp-TAZ9MDfReWxw&usqp=CAU",
        whoYouAre: "Tengo una gran pasion por los niños,a ellos les encanta pasar el tiempo con migo.",
    },

];




const Offerservices: React.FC = () => {
    const [slider, setSlider] = useState<Slider | null>(null);
    return (
        <Layout>
            <Container maxW={"container.xl"} py={12}>
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
                <Container
                    paddingTop={8}
                    paddingBottom={3}
                    maxW={"container.xl"}
                    centerContent
                >
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
                </Container>
                <Container

                    paddingBottom={8}
                    maxW={"container.xl"}
                    centerContent
                >
                    <Stack
                        direction={"row"}
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
                </Container>
            </Container>
            <Divider />
            <Container centerContent py={10} maxW={"container.xl"} >
                <Heading>POSTULATE Y ENCONTRA TRABAJO</Heading>
                <Text color={'gray.500'} fontSize={'lg'}>
                    En nuestra pagina vas a poder postularte y llegar a miles de personas que se encuentran en tu ciudad en busca de tus cualidades
                </Text>

            </Container>
            <Container maxW={"container.xl"} paddingBottom={20}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Stack
                        spacing={2}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <ListChecks size={50} color="#6bdaae" />
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
                        <AddressBook size={50} color="#6bdaae" />
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
                            <Star size={50} color="#ffea00" weight="duotone" />
                            <Star size={50} color="#ffea00" weight="duotone" />
                            <Star size={50} color="#ffea00" weight="duotone" />
                            <Star size={50} color="#ffea00" weight="duotone" />
                            <Star size={50} color="#ffea00" weight="duotone" />
                        </Stack>
                        <Heading fontSize={"lg"}>SISTEMA DE ESTRELLAS</Heading>
                        <Text>
                            Las personas que te contraten van a poder calificar tus trabajos, esto va a permitir que te destaques sobre el resto por hacerlo de la mejor manera.
                        </Text>
                    </Stack>
                </SimpleGrid>
            </Container>
            <Divider />
            <Stack
                py={10}
            >
                <Container
                    maxW={'5xl'}
                    centerContent
                >
                    <Stack
                        spacing={2}
                    >
                        <Heading>¿COMO EMPEZAR?</Heading>

                    </Stack>
                </Container>
            </Stack>
            <Container maxW={"container.xl"} paddingBottom={20} >
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

            <Divider />

            <Stack
                py={10}
                spacing={3}
            >

                <Stack
                    align={'center'}
                    alignSelf={'center'}
                    spacing={3}>

                    <Heading>¿QUE DICEN LOS RUBRITS?</Heading>
                </Stack>
            </Stack>



            <Container maxW={"container.xl"} paddingBottom={20}>

                <Box
                    position={'relative'}
                    width={'full'}
                    overflow={'hidden'}>
                    <link
                        rel="stylesheet"
                        type="text/css"
                        charSet="UTF-8"
                        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                    />
                    <IconButton
                        background={"green.500"}
                        aria-label="left-arrow"
                        position="absolute"
                        left="20px"
                        top="40%"
                        transform={'translate(0%, -50%)'}
                        zIndex={2}
                        onClick={() => slider?.slickPrev()}>
                        <ArrowLeft />
                    </IconButton>
                    {/* Right Icon */}
                    <IconButton
                        background={"green.500"}
                        aria-label="right-arrow"
                        position="absolute"
                        right="20px"
                        top="40%"
                        transform={'translate(0%, -50%)'}
                        zIndex={2}
                        onClick={() => slider?.slickNext()}>
                        <ArrowRight />
                    </IconButton>
                    <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                        {whatTheySay.map((category, index) => <WhatTheySayCard key={index} opinion={category.opinion} imagen={category.image} name={category.name} city={category.city} province={category.province} whoYouAre={category.whoYouAre} avatar={category.avatar} />)}
                    </Slider>
                </Box>
            </Container>

        </Layout>
    );
};

const WhatTheySayCard: React.FC<WhatTheySayCardProps> = ({ imagen, name, city, province, whoYouAre, avatar, opinion }) => {
    return (
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
                            imagen
                        }
                        alt={name}
                        objectFit={"fill"}
                        w={'full'}
                        h={'full'}
                    />
                </Box>
                <Stack>

                    <Text color={'green.500'}>
                        " {opinion} "
                    </Text>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src={avatar}

                    />
                    <Stack direction={'column'} spacing={0}>
                        <Text fontSize={'lg'} fontWeight={600}>{name}</Text>
                        <Text fontSize={'xs'} color={'gray.500'}>{city}-{province}</Text>
                        <Text color={'gray.500'}>{whoYouAre}</Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
};


const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "170px",
    slidesToShow: 2,
    speed: 500,
    responsive: [
        {
            breakpoint: 1150,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "10px",
                slidesToShow: 2
            }
        },
        {
            breakpoint: 843,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: "1px",
                slidesToShow: 1,
                dots: true
            }
        }
    ]


};

interface WhatTheySayCardProps {
    imagen: string,
    name: string,
    city: string,
    province: string,
    whoYouAre: string,
    avatar: string,
    opinion: string
}

export default Offerservices;