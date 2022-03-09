//from chakra
import {
  Flex,
  Text,
  Box,
  AccordionItem,
  AccordionButton,
  Button,
  AccordionIcon,
  AccordionPanel,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
//from modules
import { Session } from "next-auth/core/types";
//Components
import DeleteUserModal from "./DeleteUserModal";

type Props = {
  session: Session;
};

const DeleteUser = ({ session }: Props) => {
  const {
    isOpen: isOpenDeleteUserModal,
    onOpen: onOpenDeleteUserModal,
    onClose: onCloseDeleteUserModal,
  } = useDisclosure();
  document.getElementById("a")?.click();
  return (
    <AccordionItem borderBottom={"2px solid gray"} pt={4} pb={4} id="a">
      <h2>
        <AccordionButton
          _focus={{ border: "transparent" }}
          _hover={{ bg: "transparent" }}
        >
          <Box flex={1} textAlign={"left"}>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight={500}>
              Desactivar Cuenta
            </Text>
          </Box>

          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pt={4} w={"95%"}>
        <Flex flexDirection={{ base: "column" }}>
          <Text>
            Tenga en cuenta que esta acción es irreversible, por lo que perdera
            toda la información cargada, servicios activos e inactivos. Si posee
            la suscripcion premium, esta sera suspendida de manera automatica.
          </Text>

          <Button
            mt={{ base: "1rem", md: "2rem" }}
            bg={"warning_red"}
            color="#fafafa"
            _hover={{
              boxShadow: "2px 2px 5px gray",
            }}
            rightIcon={<DeleteIcon />}
            onClick={onOpenDeleteUserModal}
          >
            Desactivar Cuenta
          </Button>

          <DeleteUserModal
            {...{
              isOpenDeleteUserModal,
              onCloseDeleteUserModal,
              session,
            }}
          />
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DeleteUser;
