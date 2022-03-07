//from chakra
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  VStack,
  Text,
  Checkbox,
  Button,
  FormControl,
  Textarea,
  StackDivider,
  ButtonGroup,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
//from modules
import axios from "axios";
import { useState } from "react";
import { signOut } from "next-auth/react";
//types
import { Session } from "next-auth/core/types";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteUser: React.FC<{
  isOpenDeleteUser: boolean;
  onCloseDeleteUser(): void;
  warningColor: string;
  user: Session;
}> = ({ isOpenDeleteUser, onCloseDeleteUser, warningColor, user }) => {
  const toast = useToast();
  const [next, setNext] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [reasons, setReasons] = useState<Array<string>>([]);
  const [other, setOther] = useState<{
    isActive: boolean;
    description: string;
  }>({
    isActive: false,
    description: "",
  });

  const deleteUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/api/user?reasons=${JSON.stringify([
          ...reasons,
          other.description,
        ])}&email=${user.email}&password=${password}`
      );
      if (data) {
        toast({
          title: "La cuenta fue eliminada exitosamente.",
          description: "Esperamos verlo pronto!.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
        return signOut();
      }
    } catch (err) {
      setLoading(false);
      toast({
        title: "Hubo un error al eliminar la cuenta.",
        description:
          "Comprueba si la contraseña es correcta, si el problema persiste reemplaza la contraseña o contactanos!.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (reasons.includes(value)) {
      setReasons(reasons.filter((f: string) => f !== value));
    } else if (name === "isActive") {
      setOther({
        ...other,
        isActive: e.target.checked,
      });
    } else if (name === "description") {
      setOther({
        ...other,
        description: value,
      });
    } else {
      setReasons([...reasons, value]);
    }
  };

  const handleOtherReasons = (e: any) => {
    const { value, name } = e.target;

    if (name === "isActive") {
      setOther({
        ...other,
        isActive: e.target.checked,
      });
    }
    if (name === "description") {
      setOther({
        ...other,
        description: value,
      });
    }
  };

  const refresh = () => {
    setNext(false);
    setReasons([]);
    setOther({
      isActive: false,
      description: "",
    });
    setPassword("");
  };

  return (
    <Modal
      isOpen={isOpenDeleteUser}
      onClose={onCloseDeleteUser}
      blockScrollOnMount
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={warningColor}>
          {!next ? "Borrar Cuenta" : "Confirmar Eliminación"}
        </ModalHeader>
        <ModalCloseButton onClick={refresh} />
        <ModalBody>
          {!next && <Text>¿Por qué razón desea dar de baja a su cuenta?</Text>}

          <FormControl>
            {!next ? (
              <VStack
                spacing={4}
                align="stretch"
                marginTop={5}
                divider={<StackDivider />}
              >
                <Checkbox
                  colorScheme="green"
                  value={"No Tuve una buena experiencia."}
                  onChange={handleChange}
                  isChecked={reasons.includes("No Tuve una buena experiencia.")}
                >
                  No Tuve una buena experiencia.
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  value={"La Aplicación no cumple con mis expectativas."}
                  onChange={handleChange}
                  isChecked={reasons.includes(
                    "La Aplicación no cumple con mis expectativas."
                  )}
                >
                  La Aplicación no cumple con mis expectativas.
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  value={"La Actitud de los usaurios no es la adecuada."}
                  onChange={handleChange}
                  isChecked={reasons.includes(
                    "La Actitud de los usaurios no es la adecuada."
                  )}
                >
                  La Actitud de los usaurios no es la adecuada.
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  value={"No Hay ofertas profesionales en mi área."}
                  onChange={handleChange}
                  isChecked={reasons.includes(
                    "No Hay ofertas profesionales en mi área."
                  )}
                >
                  No Hay ofertas profesionales en mi área.
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  value={"La Aplicación no funciona como deberia."}
                  onChange={handleChange}
                  isChecked={reasons.includes(
                    "La Aplicación no funciona como deberia."
                  )}
                >
                  La Aplicación no funciona como deberia.
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  name={"isActive"}
                  onChange={handleOtherReasons}
                  isChecked={other.isActive}
                >
                  Otros.
                </Checkbox>
                {other.isActive && (
                  <Textarea
                    marginTop={4}
                    placeholder="Deseo borrar mi cuenta porque . . ."
                    size="sm"
                    resize={"none"}
                    name={"description"}
                    onChange={handleOtherReasons}
                    value={other.description}
                  />
                )}

                <Text>
                  Gracias a la información que usted nos provee podremos mejorar
                  nuestro servicio para futuras actualizaciones.
                </Text>
              </VStack>
            ) : (
              <>
                <Checkbox
                  colorScheme="green"
                  onChange={(e: any) => setAgree(e.target.checked)}
                  isChecked={agree}
                >
                  Entiendo que se eliminarán todos los mensajes y archivos de mi
                  espacio de trabajo, asi como tambien todas las ofertas
                  laborales activas y/o inactivas.
                </Checkbox>
                <FormLabel marginTop={7}>Contraseña de Rubrit App</FormLabel>
                <Input
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Text marginTop={3} fontSize={{ base: "sm", md: "md" }}>
                  Esta es la contraseña que se usó cuando configuraste Rubrit,
                  si te registraste con un servicio externo no posees una.
                  ¿Tienes que crear o restablecer tu contraseña de Rubrit?
                </Text>
              </>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {!next ? (
            <Button
              colorScheme="blue"
              disabled={
                !reasons.length && !other.description.length ? true : false
              }
              onClick={() => setNext(true)}
            >
              Siguiente
            </Button>
          ) : (
            <ButtonGroup>
              <Button colorScheme="blue" onClick={() => setNext(false)}>
                Volver
              </Button>

              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                disabled={!agree || !password.length ? true : false}
                onClick={deleteUser}
                isLoading={loading}
              >
                Eliminar Cuenta
              </Button>
            </ButtonGroup>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUser;
