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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Switch,
} from "@chakra-ui/react";
import { ChevronDownIcon, EditIcon, MinusIcon } from "@chakra-ui/icons";
//from modules
import Image from "next/image";
//types
import { Session } from "next-auth/core/types";
//assets
import WorkerIcon from "assets/worker.png";
//helper
import useHelper from "./useHelper";
import { useEffect } from "react";

type Props = {
  session: Session;
};

const ProfesionalUpdate = ({ session }: Props) => {
  const {
    isOpen: isOpenUpdateProfile,
    onOpen: onOpenUpdateProfile,
    onClose: onCloseUpdateProfile,
  } = useDisclosure();

  useEffect(() => {}, [session]);

  return (
    <Box mt={16} w={"100%"} minH={"94%"} position={"relative"}>
      <Flex position={"absolute"} top={-12} left={9} alignItems={"center"}>
        <Image
          src={WorkerIcon}
          alt="user-image"
          width={"32px"}
          height={"32px"}
        />
        <Text fontSize={"28px"} ml={2} fontWeight={500}>
          Modificar Perfil Profesional
        </Text>
      </Flex>

      <Flex
        bg={useColorModeValue("#fafafa", "#1A202C")}
        w={"100%"}
        h={"20rem"}
        border="1px solid gray"
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        borderTopRightRadius={5}
        borderTopLeftRadius={5}
        justifyContent={"center"}
      >
        <Box w={"80%"} mt={8}>
          <Flex
            justifyContent={"space-between"}
            h={"2rem"}
            alignItems={"center"}
            cursor={"pointer"}
          >
            <Text color="gray" fontSize={{ base: "md", lg: "lg" }} mb={2}>
              Servicios Ofrecidos
            </Text>
            <Button
              rightIcon={<EditIcon boxSize={"25px"} />}
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
                      <Text mb={1} fontSize={{ base: "md", lg: "lg" }}>
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
      </Flex>
    </Box>
  );
};

export default ProfesionalUpdate;

type DrawerProps = {
  onClose(): void;
  isOpen: boolean;
  session: Session;
};

const UpdateCategories = ({ onClose, isOpen, session }: DrawerProps) => {
  const {
    categories,
    drawerLoading,
    selectedCategories,
    handleChangeCategories,
    handleSubmitCategories,
  } = useHelper({
    session,
  });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Categorias</DrawerHeader>

        <DrawerBody>
          <Accordion allowToggle mt={3}>
            {categories.map((m, i: number) => (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton p={3}>
                    <Flex key={i} alignItems={"center"}>
                      <ChevronDownIcon color={"green"} mr={2} />
                      <Image
                        src={m.icon}
                        width={"35px"}
                        height={"35px"}
                        alt={`cat-icon-${m.name}`}
                      />
                      <Text fontSize={{ base: "md", lg: "lg" }} ml={2}>
                        {m.name}
                      </Text>
                    </Flex>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {m.subcategories.map((s, i: number) => (
                    <Flex key={i} alignItems={"center"} ml={2} p={1}>
                      <Switch
                        value={`${s._id},${m._id}`}
                        onChange={handleChangeCategories}
                        isChecked={selectedCategories[`${m._id}`][`${s._id}`]}
                      />
                      <Text fontSize={{ base: "md", lg: "md" }} ml={2}>
                        {s.name}
                      </Text>
                    </Flex>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmitCategories}
            isLoading={drawerLoading}
          >
            Modificar Categorias
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
