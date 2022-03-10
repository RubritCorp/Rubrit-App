//from chakra
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Divider,
  Text,
  Switch,
  Box,
  Flex,
  Select,
  FormControl,
  Button,
  ButtonGroup,
  VStack,
} from "@chakra-ui/react";

//from modules
//types
import { Session } from "next-auth/core/types";
import useHelper from "./useHelper";

type Props = {
  user: Session;
  isOpenPreferences: boolean;
  onClosePreferences(): void;
};

const Preferences = ({
  user,
  isOpenPreferences,
  onClosePreferences,
}: Props) => {
  const { loading, initialValues, setInitialValues, onChange, handleSubmit } =
    useHelper({
      user,
      onClosePreferences,
    });

  return (
    <Modal
      isOpen={isOpenPreferences}
      onClose={() => {
        onClosePreferences();
        setInitialValues({
          notificationsMessages: user.preferences.notificationsMessages,
          notificationsNewOffer: user.preferences.notificationsNewOffer,
          hideAddress: user.preferences.hideAddress,
          showAllChats: user.preferences.showAllChats,
          language: user.preferences.language,
        });
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text color={"medium_green"}>Preferencias</Text>
          <ModalCloseButton />
          <Divider mt={4} />
        </ModalHeader>
        <ModalBody>
          <>
            <Text>Notificaciones</Text>
            <Text fontSize={{ base: "xs", md: "md" }} mt={1} mb={3}>
              Te recomendamos que actives las notificaciones para estar al tanto
              de la actividad importante que se desarrolla en tu ciudad.
            </Text>
            <Text>Notificarme sobre...</Text>
            <Divider mt={4} mb={4} />
            <Flex mb={4}>
              <Switch
                mr={3}
                isChecked={initialValues.notificationsMessages}
                name="notificationsMessages"
                onChange={onChange}
              />
              <Text fontSize={{ base: "sm", md: "md" }}>Mensajes Nuevos</Text>
            </Flex>

            <Flex mb={4}>
              <Switch
                mr={3}
                isChecked={initialValues.notificationsNewOffer}
                name="notificationsNewOffer"
                onChange={onChange}
              />
              <Text fontSize={{ base: "sm", md: "md" }}>
                Ofertas de Trabajo Nuevas
              </Text>
            </Flex>

            <Divider />
            <Text mb={4} mt={4}>
              Privacidad y Visibilidad
            </Text>
            <Divider />
            <Flex flexDirection={"column"} mt={4}>
              <Flex>
                <Switch
                  mr={3}
                  isChecked={initialValues.hideAddress}
                  name="hideAddress"
                  onChange={onChange}
                />
                <Text fontSize={{ base: "sm", md: "md" }}>
                  Ocultar mi Ubicación
                </Text>
              </Flex>
              <Text fontSize={{ base: "xs", md: "md" }} mt={1} mb={3}>
                Ten en cuenta que si ocultas tu ubicación, los usuarios no
                sabran tu area de servicios.
              </Text>
            </Flex>

            <Flex mb={4}>
              <Switch
                mr={3}
                isChecked={initialValues.showAllChats}
                name="showAllChats"
                onChange={onChange}
              />
              <Text fontSize={{ base: "sm", md: "md" }}>
                Mostrar todos los Chats
              </Text>
            </Flex>

            <Flex>
              <Switch
                mr={3}
                isChecked={!initialValues.showAllChats}
                name="showAllChats"
                onChange={onChange}
              />
              <Text fontSize={{ base: "sm", md: "md" }}>
                Mostar unicamente los Chats pendientes{" "}
              </Text>
            </Flex>

            <Flex mt={4}>
              <Select
                placeholder="Idioma"
                name="language"
                defaultValue={initialValues.language}
                onChange={onChange}
              >
                <option value={"Deutsch (Deutschland)"}>
                  Deutsch (Deutschland)
                </option>
                <option value={"English (UK)"}>English (UK)</option>
                <option value={"English (US)"}>English (US)</option>
                <option value={"Español (España)"}>Español (España)</option>
                <option value={"Español (Latinoamérica)"}>
                  Español (Latinoamérica)
                </option>
                <option value={"Français (France)"}>Français (France)</option>
                <option value={"Italiano (Italia)"}>Italiano (Italia)</option>
                <option value={"Português (Brasil)"}>Português (Brasil)</option>
              </Select>
            </Flex>
          </>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              colorScheme={"blue"}
              onClick={() => {
                onClosePreferences();
                setInitialValues({
                  notificationsMessages: user.preferences.notificationsMessages,
                  notificationsNewOffer: user.preferences.notificationsNewOffer,
                  hideAddress: user.preferences.hideAddress,
                  showAllChats: user.preferences.showAllChats,
                  language: user.preferences.language,
                });
              }}
            >
              Cancelar
            </Button>
            <Button
              colorScheme={"green"}
              isLoading={loading}
              onClick={handleSubmit}
            >
              Actualizar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Preferences;
