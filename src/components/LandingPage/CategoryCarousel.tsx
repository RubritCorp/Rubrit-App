// Import external libraries
import {
  Flex,
  Box,
  Heading,
  IconButton,
  useColorModeValue,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import Slider from "react-slick";
// Import native libraries
import { useState } from "react";
import { useCategories } from "Provider/CategoriesProvider";
import Image from "next/image";

const CategoryCarousel: React.FC = () => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const { categories } = useCategories();
  return (
    <Flex
      direction="column"
      alignItems="center"
      padding="50px 0px"
      gap="50px"
      bg={useColorModeValue("light_grey", "dark_green")}
    >
      <Box textAlign="center">
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
            <CategoryCard
              key={index}
              title={category?.name}
              image={category?.picture_small}
            />
          ))}
        </Slider>
      </Box>
    </Flex>
  );
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => {
  return (
    <Box
      position={"relative"}
      w="276px"
      h="377px"
      margin="10px 10px"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
    >
      <Image src={image} quality={50} objectFit={"cover"} layout={"fill"} />
      {/*  <Text
        position={"absolute"}
        zIndex={1}
        color={"black"}
        as="h3"
        size="lg"
      >
        {title}
      </Text> */}
    </Box>

    /*    <Flex
       flexDirection={"column"}
         w="276px"
         h="377px"
         margin="10px 10px"
         borderWidth="1px"
         rounded="lg"
         shadow="lg"
       > 
   
         <Box
        position={"relative"}
        top={"50%"}
        left={"38%"}
       
        zIndex={1}
         >
   
           <Text
             as="h3"
             size="lg"
             color="white"
           >
             {title}
           </Text>
   
         </Box>
           <Image src={image} quality={50} width={"276px"} height={"377px"} />
   
       </Flex> */
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
  image: string;
}

export default CategoryCarousel;
function translate(
  arg0: string,
  arg1: string
):
  | import("csstype").Property.Transform
  | import("csstype").Property.Transform[]
  | undefined {
  throw new Error("Function not implemented.");
}
