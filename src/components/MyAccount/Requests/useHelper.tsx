import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
  PopoverTrigger,
  Image,
  ButtonGroup,
  Textarea,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import { useState, useRef } from "react";

import { Star } from "phosphor-react";

import styles from "./Starsrating.module.css";

interface IStarsRating {
  rating: number;
  hover: number;
  setRating: (i: number) => void;
  setHover: (i: number) => void;
}

const StarRating: React.FC<IStarsRating> = ({
  rating,
  hover,
  setRating,
  setHover,
}) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? `${styles.on}` : `${styles.off}`
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <Star weight="fill" size={30} />
          </button>
        );
      })}
    </div>
  );
};

interface IForm {
  score: number;
  comment: string;
  userComment: string;
  date: string;
  user: string;
  requestId: string;
}

export const Form: React.FC<any> = ({
  onCancel,
  userId,
  profId,
  load,
  setReload,
  onClose,
  format,
  requestId,
}) => {
  const date = new Date();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const formatedDate = date.toISOString().split("T")[0];
  const areaRef = useRef<any>();
  const toast = useToast();
  const [form, setForm] = useState<IForm>({
    score: 0,
    comment: "",
    userComment: format === "received" ? profId : userId,
    date: formatedDate,
    user: format === "received" ? userId : profId,
    requestId,
  });

  function handleInputOnChange(event: any) {
    setForm({ ...form, comment: event.target.value, requestId });
  }

  async function handleOnSubmit() {
    const finalData = {
      ...form,
      score: rating,
    };

    areaRef.current.value = "";
    onClose();
    setHover(0);
    setRating(0);
    await axios.put(`/api/user/commentReceived`, {
      data: {
        data: finalData,
      },
    });
    setReload(!load);
    toast({
      title: "Comentario enviado",
      description: "Se envio tu comentario y puntuacion al usuario",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }
  return (
    <Flex justifyContent={"center"}>
      <Stack spacing={5} h={"350px"}>
        <Flex justifyContent={"center"}>
          <Text fontWeight={800} m={"10px"}>
            Comentario
          </Text>
        </Flex>
        <Textarea
          placeholder="Dejar un comentario al usuario."
          onChange={handleInputOnChange}
          name={"textarea"}
          ref={areaRef}
        />
        <Flex justifyContent={"center"}>
          <Text fontWeight={800} m={"5px"}>
            Puntuacion
          </Text>
        </Flex>
        <Flex justifyContent={"center"}>
          <StarRating
            {...{
              rating,
              hover,
              setRating,
              setHover,
            }}
          />
        </Flex>
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button bg={"medium_green"} onClick={handleOnSubmit}>
            Submit
          </Button>
        </ButtonGroup>
      </Stack>
    </Flex>
  );
};

export const ImageModal: React.FC<any> = ({ url, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Image
          src={url}
          alt={`img-solicitud ${title}`}
          maxW={"120px"}
          maxH={"120px"}
          objectFit="cover"
          m={"5px"}
          onClick={onOpen}
          _hover={{ cursor: "zoom-in" }}
        ></Image>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textAlign={"center"}>{title}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"center"}>
              <Image src={url} alt={`img-solicitud ${title}`}></Image>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const ModalFinalizar: React.FC<any> = ({
  id,
  request,
  close,
  load,
  setReload,
}) => {
  const initialFocusRef: any = useRef();
  const toast = useToast();
  async function changeState(id: any, reason: string) {
    const updateRequest = await axios.put("api/serviceRequest/new", {
      data: {
        params: id,
        state: reason === "Completada" ? "Completada" : "Finalizada",
      },
    });

    setReload(!load);
    toast({
      title: "Cambio de estado",
      description: `Tu solicitud se cambio al estado de ${
        reason === "Completada" ? "completada" : "finalizada"
      }`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  const handleChangeActive = (event: any) => {
    const { value } = event.target;
    changeState(id, value);
    close();
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button colorScheme="yellow">Finalizar</Button>
      </PopoverTrigger>
      <PopoverContent borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Opciones para terminar una solicitud
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Si finalizas la publicacion no vas a poder modificarla y se dara como
          finalizada. El trabajo quedara registrado como finalizado pero no
          completado. Para poder dar por completado la solicitud debe seleccion
          la opcion de Completar.
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button
              colorScheme="green"
              bg={"medium_green"}
              onClick={handleChangeActive}
              value="Completada"
            >
              Completada
            </Button>
            <Button
              ref={initialFocusRef}
              onClick={handleChangeActive}
              bg={"warning_red"}
              value="Finalizada"
            >
              Cancelar solicitud
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export const ModalActivar: React.FC<any> = ({
  id,
  request,
  close,
  load,
  setReload,
}) => {
  const initialFocusRef: any = useRef();
  const toast = useToast();
  async function changeState(id: any) {
    const updateRequest = await axios.put("api/serviceRequest/new", {
      data: {
        params: id,
        state: request?.state?.active ? "Desactivar" : "Activar",
      },
    });

    setReload(!load);
    toast({
      title: "Cambio de estado",
      description: `Tu solicitud se cambio al estado de ${
        request?.state?.active ? "pendiente" : "activa"
      }`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  const handleChangeActive = () => {
    changeState(id);
    close();
  };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <Button colorScheme="yellow">
          {request?.state?.active ? "Desactivar" : "Activar"}
        </Button>
      </PopoverTrigger>
      <PopoverContent borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          <Text m={"0 auto"}>Aviso</Text>
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Al desactivar la solicitud, el estado de la misma se cambiara a
          pendiente.
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button
              colorScheme="yellow"
              ref={initialFocusRef}
              onClick={handleChangeActive}
            >
              {request?.state?.active ? "Desactivar" : "Activar"}
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export const useHelper = () => {};
