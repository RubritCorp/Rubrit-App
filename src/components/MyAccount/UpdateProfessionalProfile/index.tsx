//from chakra
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
//from modules
import Image from "next/image";
import { useEffect } from "react";
//types
import { Session } from "next-auth/core/types";
//assets
import WorkerIcon from "assets/worker.png";
//components
import UpdateCategories from "./UpdateCategories";
import UpdateRange from "./UpdateRange";
import Map from "components/Maps/Map";

type Props = {
  session: Session;
};

const ProfessionalUpdate = ({ session }: Props) => {
  const {
    isOpen: isOpenUpdateProfile,
    onOpen: onOpenUpdateProfile,
    onClose: onCloseUpdateProfile,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdateRange,
    onOpen: onOpenUpdateRange,
    onClose: onCloseUpdateRange,
  } = useDisclosure();

  useEffect(() => {}, [session]);

  return (
    <Box mt={16} w={"100%"} position={"relative"}>
      <Flex position={"absolute"} top={-12} left={9} alignItems={"center"}>
        <Image
          src={WorkerIcon}
          alt="user-image"
          width={"32px"}
          height={"32px"}
        />
        <Text fontSize={{ base: "md", md: "28px" }} ml={2} fontWeight={500}>
          Modificar Perfil Profesional
        </Text>
      </Flex>

      <Flex
        bg={useColorModeValue("#fafafa", "#1A202C")}
        w={"100%"}
        border="1px solid gray"
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        borderTopRightRadius={5}
        borderTopLeftRadius={5}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box w={"80%"} mt={8}>
          <Flex
            justifyContent={"space-between"}
            h={"2rem"}
            alignItems={"center"}
            cursor={"pointer"}
          >
            <Text color="gray" fontSize={{ base: "sm", md: "lg" }} mb={2}>
              Servicios Ofrecidos
            </Text>
            <Button
              rightIcon={<EditIcon boxSize={{ base: "15px", md: "25px" }} />}
              size={"md"}
              onClick={onOpenUpdateProfile}
            >
              Editar
            </Button>
          </Flex>
          <UpdateCategories
            isOpen={isOpenUpdateProfile}
            onClose={onCloseUpdateProfile}
            session={session}
          />
          <Accordion allowToggle mt={3}>
            {session.workerData.items.map((m, i: number) => (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton>
                    <Flex key={i} alignItems={"center"}>
                      <ChevronDownIcon color={"green"} mr={2} />
                      <Text mb={1} fontSize={{ base: "sm", md: "lg" }}>
                        {m.category.name}
                      </Text>
                    </Flex>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {m.subcategories.map((m, i: number) => (
                    <Flex key={i} alignItems={"center"} ml={6}>
                      <MinusIcon color={"green"} mr={2} />
                      <Text fontSize={{ base: "sm", lg: "md" }}>{m.name}</Text>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        <Box w={"80%"} mt={8}>
          <Flex
            justifyContent={"space-between"}
            h={"2rem"}
            alignItems={"center"}
            cursor={"pointer"}
          >
            <Flex alignItems={"center"}>
              <Text color="gray" fontSize={{ base: "sm", md: "lg" }}>
                Rango de Servicio
              </Text>
              <Text
                ml={{ base: 0, md: 3 }}
                color={"medium_green"}
                fontSize={{ base: "sm", md: "lg" }}
              >
                {session.workerData.rangeCoverage} km
              </Text>
            </Flex>
            <Button
              rightIcon={<EditIcon boxSize={{ base: "15px", md: "25px" }} />}
              onClick={onOpenUpdateRange}
            >
              Editar
            </Button>
            <UpdateRange
              isOpen={isOpenUpdateRange}
              onClose={onCloseUpdateRange}
              {...{ session }}
            />
          </Flex>
          <Box w={"100%"} h={"20rem"} mt={4} mb={4}>
            <Map
              location={{ lat: session.address.lat, lng: session.address.lng }}
              coverage={session.workerData.rangeCoverage}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfessionalUpdate;
