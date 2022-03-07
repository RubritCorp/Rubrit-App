// Import external libraries
import {
  Flex,
  Box,
  Heading,
  IconButton,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import Slider from "react-slick";
// Import native libraries
import { useState } from "react";

const CategoryCarousel: React.FC = () => {
  const [slider, setSlider] = useState<Slider | null>(null);
  let categories = [
    "Hogar",
    "Oficina",
    "Comercio",
    "Construcción",
    "Profesores",
    "Software",
    "Agro",
    "Belleza",
    "Comida",
  ];
  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="50px 0px"
      gap="50px"
      bg={useColorModeValue("light_grey", "dark_green")}
    >
      <Box  textAlign="center">
        <Heading size="lg">Servicios profesionales populares</Heading>
        <Heading size="md">
          Encuentra todos los profesionales que necesitas para tu hogar
        </Heading>
      </Box>
      <Box position={"relative"} width={"full"} overflow={"hidden"}>
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
          aria-label="left-arrow"
          position="absolute"
          backgroundColor="none"
          left="20px"
          top="50%"
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <ArrowLeft />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          position="absolute"
          right="20px"
          top="50%"
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <ArrowRight />
        </IconButton>
        <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
          {categories.map((category, index) => (
            <CategoryCard key={index} title={category} />
          ))}
        </Slider>
      </Box>
    </Flex>
  );
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title }) => {
  return (
    <Flex
      w="276px"
      h="377px"
      margin="0px 10px"
      justifyContent="center"
      alignItems="center"
      padding="10px"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(banner-image-1.jpg)`}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Heading as="h3" size="lg" color="white">
        {title}
      </Heading>
    </Flex>
  );
};

// Settings for the slider
const settings = {
  arrows: true,
  infinite: true,
  autoplay: false,
  slidesToScroll: 1,
  variableWidth: true,
  adaptiveHeight: true,
  swipeToSlide: true,
};

interface CategoryCardProps {
  title: string;
}

export default CategoryCarousel;
