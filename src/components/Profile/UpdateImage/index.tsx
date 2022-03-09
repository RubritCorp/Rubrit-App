//from chakra
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
//crop
import Cropper from "react-easy-crop";
//types
import { Session } from "next-auth/core/types";
//helper
import useHelper from "./useHelper";

const UpdateImage: React.FC<{
  user: Session;
  isOpenUpdateImage: boolean;
  onCloseUpdateImage(): void;
  image: string;
  setImage(value: string): void;
  inputFileRef: any;
}> = ({
  user,
  isOpenUpdateImage,
  onCloseUpdateImage,
  image,
  setImage,
  inputFileRef,
}) => {
  const {
    loading,
    crop,
    zoom,
    croppedImage,
    setCrop,
    setCroppedImage,
    setRotation,
    setZoom,
    onCropComplete,
    showCroppedImage,
    editProfilePic,
  } = useHelper({ user, onCloseUpdateImage, image });

  return (
    <Modal
      isOpen={isOpenUpdateImage}
      onClose={() => {
        onCloseUpdateImage();
        setCrop({ x: 0, y: 0 });
        setRotation(0);
        setZoom(1);
        setImage("");
        setCroppedImage(null);
        inputFileRef.current.value = "";
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Recortar la Foto
          <ModalCloseButton size={"lg"} />
        </ModalHeader>
        <ModalBody p={0}>
          <Box height={"20rem"} marginBottom={"1rem"} position={"relative"}>
            <Cropper
              restrictPosition={true}
              cropShape="round"
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              cropSize={{ width: 290, height: 290 }}
            />
            <Button
              position={"absolute"}
              bottom={0}
              variant={"ghost"}
              colorScheme={"white"}
              color={"white"}
              onClick={showCroppedImage}
            >
              Vista Previa
            </Button>
          </Box>
          <Flex alignItems={"center"} flexDirection={"column"}>
            <Text>Zoom</Text>
            <Slider
              width={"90%"}
              size={"lg"}
              value={zoom}
              min={1}
              max={3}
              step={0.001}
              aria-label="Zoom"
              onChange={(zoom) => setZoom(zoom)}
            >
              <SliderTrack bg="green.100" boxSize={2}>
                <SliderFilledTrack bg="green" />
              </SliderTrack>
              <SliderThumb boxSize={6} bg={"green"}>
                <Box bg="tomato" />
              </SliderThumb>
            </Slider>
          </Flex>
          {croppedImage && (
            <Box p={3}>
              <Text color={"grey"} marginTop={2}>
                Vista Previa
              </Text>
              <Flex marginTop={2}>
                <Avatar src={croppedImage} name={user.name} size="md" />
                <Box marginLeft={3}>
                  <Text textTransform={"capitalize"}>{user.name}</Text>
                  <Box
                    height="20px"
                    width={"140px"}
                    bg={"gray.700"}
                    borderRadius={"10px"}
                    marginTop={1}
                  />
                </Box>
              </Flex>
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button
              onClick={() => {
                onCloseUpdateImage();
                setCrop({ x: 0, y: 0 });
                setRotation(0);
                setZoom(1);
                setImage("");
                setCroppedImage(null);
                inputFileRef.current.value = "";
              }}
              colorScheme={"blue"}
            >
              Cancelar
            </Button>
            <Button
              colorScheme={"green"}
              isLoading={loading}
              onClick={editProfilePic}
            >
              Confirmar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateImage;
