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
  Container,
} from "@chakra-ui/react";
import Loading from "components/Loading";
import Link from "next/link";
import { useUsers } from "Provider/UsersProvider";
import { useState } from "react";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1950,
      settings: {
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 4,
        dots: true,
      },
    },
    {
      breakpoint: 1640,
      settings: {
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 3,
        dots: true,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        centerMode: true,
        centerPadding: "10px",
        slidesToShow: 2,
        dots: true,
      },
    },
    {
      breakpoint: 843,
      settings: {
        centerMode: true,
        centerPadding: "1px",
        slidesToShow: 1,
        dots: true,
      },
    },
  ],
};

const NearProfesionals: React.FC = () => {
  const { users, status } = useUsers();
  const [slider, setSlider] = useState<Slider | null>(null);

  if (status === "true" || status === "false") return <Loading />;

  //filtrar

  return (
    <Box
      position={"relative"}
      height={"600px"}
      width={"full"}
      overflow={"hidden"}
    >
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
        {users.map((item, index: number) => (
          <CardFindProfesional
            key={index}
            _id={item._id}
            name={item.name}
            img={item.items[0].category.picture_small}
            avatar={item.profilePic}
            city={item.address.name}
            description={item.description}
          />
        ))}
      </Slider>
    </Box>
  );
};

interface CardFindProfesionalProps {
  img: string;
  _id: string;
  name: string;
  city: string;
  avatar: string;
  description: string;
}

const CardFindProfesional: React.FC<CardFindProfesionalProps> = ({
  _id,
  name,
  img,
  avatar,
  city,
  description,
}) => {
  return (
    <Container maxW={"container.xl"} centerContent py={10}>
      <Flex cursor={"pointer"}>
        <Center py={6}>
          <Box
            key={name}
            maxW={"350px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Image
              h={"120px"}
              w={"full"}
              src={img}
              objectFit={"cover"}
              alt="bg"
            />
            <>
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={avatar}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>
              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {name}
                  </Heading>
                  <Text color={"gray.500"} fontSize={"small"}>
                    {city}
                  </Text>
                </Stack>
                <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text
                      align={"center"}
                      fontSize={{ base: "xs", md: "sm" }}
                      color={"green.500"}
                      w={"296px"}
                      h={"40px"}
                      overflow="hidden"
                      css={{
                        display: "-webkit-box",
                        ["WebkitBoxOrient"]: "vertical",
                        ["WebkitLineClamp"]: "2",
                      }}
                    >
                      {description}
                    </Text>
                  </Stack>
                </Stack>
                <Link href={`/professional/${_id}`} passHref>
                  <Button
                    w={"full"}
                    mt={8}
                    bg={useColorModeValue("green.500", "green.500")}
                    color={"white"}
                    rounded={"md"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    Contactar
                  </Button>
                </Link>
              </Box>
            </>
          </Box>
        </Center>
      </Flex>
    </Container>
  );
};

export default NearProfesionals;
