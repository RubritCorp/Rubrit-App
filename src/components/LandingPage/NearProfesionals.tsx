import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    SimpleGrid,
    Container,
    useBreakpointValue,
    IconButton,
} from '@chakra-ui/react';
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import { useState } from 'react';
import Slider from 'react-slick';

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

const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1150,
            settings: {
               
                centerMode: true,
                centerPadding: "10px",
                slidesToShow: 2,
                dots: true
            }
        },
        {
            breakpoint: 843,
            settings: {
              
                centerMode: true,
                centerPadding: "1px",
                slidesToShow: 1,
                dots: true
            }
        }
    ]
  };

const NearProfesionals: React.FC = () => {

    const [slider, setSlider] = useState<Slider | null>(null);
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });
    return (
        <Box
      position={'relative'}
      height={'600px'}
      width={'full'}
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
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
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
      {whatTheySay.map((item, index:number ) => ( < CardFindProfesional key={index}  name={item.name} img={item.image} avatar={item.avatar} city={item.city} province={item.province} opinion={''} whoYouAre={''} /> ))}
      </Slider>
    </Box>
  );
}

interface CardFindProfesionalProps {
    img: string, 
    name:  string,
    city:  string,
    province: string,
    opinion: string,
    avatar:  string,
    whoYouAre: string,
  }
  

const CardFindProfesional:  React.FC<CardFindProfesionalProps> = ({name, img, avatar, city, province}) => {
    
    return (
        <Container maxW={"container.xl"} centerContent py={10}>
    <Flex>
        <Center py={6}>
            <Box
                key={name}
                maxW={'350px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Image
                    h={'120px'}
                    w={'full'}
                    src={img}
                    objectFit={'cover'} />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={avatar}

                        css={{
                            border: '2px solid white',
                        }} />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {name}
                        </Heading>
                        <Text color={'gray.500'} fontSize={"small"}>{city}-{province}</Text>
                    </Stack>
                    <Stack direction={'row'} justify={'center'} spacing={6}>
                        <Stack spacing={0} align={'center'}>
                            <Text  align={"center"} fontSize={"medium"} color={'green.500'}>
                                Precio por hora promedio
                            </Text>
                            <Text  align={"center"} fontSize={"medium"} color={'green.500'}>
                                $300 / $500
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        w={'full'}
                        mt={8}
                        bg={useColorModeValue('green.500', 'green.500')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        Contactar
                    </Button>
                </Box>
            </Box>
            
        </Center>
    </Flex>
    </Container>
    );

}


export default NearProfesionals