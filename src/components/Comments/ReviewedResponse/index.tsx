import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
  Flex,
} from "@chakra-ui/react";
import useHelper from "./useHelper";

type Props = {
  isOpen: boolean;
  commentId: string;
  userWhoCommented?: string;
  setAlreadyResponded(value: boolean): void;
  setReviewedResponse({
    response,
    date,
    edited,
  }: {
    response: string;
    date: string;
    edited: boolean;
  }): void;
  onClose(): void;
};

const ReviewedResponse = ({
  isOpen,
  commentId,
  userWhoCommented,
  setAlreadyResponded,
  setReviewedResponse,
  onClose,
}: Props) => {
  const { response, loading, handleSubmit, setResponse, greeting } = useHelper({
    onClose,
    setAlreadyResponded,
    setReviewedResponse,
  });

  return (
    <Modal {...{ isOpen, onClose }} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"md"} color={"medium_green"}>
          Responder a {userWhoCommented}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Máximo 100 caracteres
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              {response.length} / 100
            </Text>
          </Flex>
          <Textarea
            marginTop={2}
            placeholder={`${greeting()}${userWhoCommented} . . .`}
            size="sm"
            resize={"none"}
            h={"7rem"}
            maxLength={100}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onClose}
            fontSize={{ base: "sm", md: "md" }}
          >
            Cerrar
          </Button>
          <Button
            fontSize={{ base: "sm", md: "md" }}
            colorScheme={"green"}
            isLoading={loading}
            onClick={() => handleSubmit(commentId)}
          >
            Responder
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewedResponse;
