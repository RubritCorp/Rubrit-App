//chakra
import { CheckIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Text,
  Flex,
  SimpleGrid,
  useColorModeValue,
  useTheme,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Tooltip,
  useDisclosure,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Session } from "next-auth/core/types";
import { useSession } from "next-auth/react";
//icons
import { Star, ThumbsUp } from "phosphor-react";
import { useRef, useState } from "react";
import ReviewedResponse from "./ReviewedResponse";

//helper
import useHelper from "./useHelper";

interface ITestimonialCard {
  professionalName: string;
  professionalPic: string;
  commentId: string;
  userId: string;
  description: string;
  score: number;
  date: string;
  index: number;
  reactions: {
    likes: {
      amount: number;
      users: string[];
    };
    dislikes: {
      amount: number;
      users: string[];
    };
    spam: {
      amount: number;
      users: string[];
    };
    reviewedResponse: {
      response: string;
      date: string;
      edited: boolean;
    };
  };
  userComment?: {
    name: string;
    profilePic: string;
  };
  Session: Session;
}
function TestimonialCard(props: ITestimonialCard) {
  const {
    professionalName,
    professionalPic,
    commentId,
    userId,
    description,
    score,
    date,
    userComment,
    reactions,
    Session,
  } = props;
  const theme = useTheme();
  const { status } = useSession();
  const {
    loading,
    amountOfLikes,
    reactionStatus,
    reviewedResponse,
    alreadyResponded,
    editReviewedResponse,
    setAlreadyResponded,
    setReviewedResponse,
    commentReview,
  } = useHelper({
    reactions,
    SessionId: `${Session?._id}`,
  });

  const {
    isOpen: isOpenReviewedResponse,
    onOpen: onOpenReviewedResponse,
    onClose: onCloseReviewedResponse,
  } = useDisclosure();

  return (
    <>
      <Flex
        bg={useColorModeValue("#EDF2F7", "#2B3444")}
        boxShadow={"xl"}
        w="100%"
        maxH="13rem"
        direction={"row"}
        rounded={"xl"}
        p={"0.7em"}
        justifyContent={"space-between"}
        position={"relative"}
        _after={{
          content: '""',
          position: "absolute",
          height: "21px",
          width: "29px",
          left: "35px",
          top: "-10px",
          backgroundSize: "cover",
          backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%232EB67D'/%3E%3C/svg%3E")`,
        }}
      >
        <Flex
          direction={"row"}
          textAlign={"left"}
          justifyContent={"space-between"}
          p={"1em .2em 0 1em"}
          w={"100%"}
        >
          <Flex
            paddingRight={"1em"}
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box minH={{ base: "4rem", md: "6rem" }}>
              <Avatar
                src={userComment?.profilePic}
                height={{ base: "70px", md: "80px" }}
                width={{ base: "70px", md: "80px" }}
                alignSelf={"center"}
              />
            </Box>
            <Flex>
              {[...Array(score)]
                .fill(undefined)
                ?.map((el: any, index: number) => {
                  return (
                    <Star
                      key={index}
                      size={12}
                      weight="fill"
                      color={theme.colors.medium_green}
                    />
                  );
                })}
            </Flex>
          </Flex>

          <Flex flexDirection="column" w={"100%"}>
            <Box minH={"6.45rem"}>
              <Flex flexWrap={"wrap"} alignItems={"center"}>
                <Text
                  fontWeight={"bold"}
                  textTransform={"capitalize"}
                  fontSize={{ base: "xs", md: "lg" }}
                  mr={2}
                >
                  {userComment?.name}
                </Text>
                <Text
                  fontSize={{ base: "xs", md: "md" }}
                  fontFamily={"Roboto"}
                  fontWeight={600}
                  color={theme.colors.medium_green}
                >
                  {date}
                </Text>
              </Flex>
              <Text
                mt={2}
                fontSize={{
                  base: "0.7rem",
                  sm: "0.8rem",
                  md: "0.9rem",
                  lg: "1rem",
                }}
                pb={2}
                h={{ base: "100px", lg: "70px" }}
                css={{
                  ":first-letter": {
                    textTransform: "uppercase",
                  },
                }}
              >
                {description}
              </Text>
              <ButtonGroup mb={2} alignItems={"center"}>
                <Tooltip label="Útil" aria-label="A tooltip">
                  <Button
                    p={0}
                    size={"lg"}
                    rounded={"full"}
                    variant={"ghost"}
                    _focus={{
                      border: "none",
                    }}
                    _hover={{
                      backgroundColor: useColorModeValue(
                        "#2b34441d",
                        "#edf2f733"
                      ),
                    }}
                    onClick={() => {
                      commentReview({
                        commentId,
                        review: "like",
                        reviewerId: `${Session?._id}`,
                        reviewedId: userId,
                      });
                    }}
                    leftIcon={
                      <ThumbsUp
                        weight={reactionStatus === "like" ? "fill" : "regular"}
                      />
                    }
                    iconSpacing={amountOfLikes === 0 ? 0 : 2}
                  >
                    <Text
                      fontSize={{ base: "xs", md: "md" }}
                      fontWeight={"normal"}
                    >
                      {amountOfLikes === 0 ? "" : amountOfLikes}
                    </Text>
                  </Button>
                </Tooltip>

                <Menu isLazy>
                  {/* fix Popper warning */}
                  <h1 style={{ margin: 0 }}>
                    <Tooltip label="Más Opciones" aria-label="A tooltip">
                      <MenuButton
                        as={Button}
                        bg={"transparent"}
                        transition={".7s"}
                        p={0}
                        size={"lg"}
                        rounded={"full"}
                        variant={"ghost"}
                        _focus={{
                          border: "none",
                        }}
                        _hover={{
                          backgroundColor: useColorModeValue(
                            "#2b34441d",
                            "#edf2f733"
                          ),
                        }}
                      >
                        <HamburgerIcon />
                      </MenuButton>
                    </Tooltip>

                    <MenuList>
                      <MenuItem
                        fontSize={{
                          base: "0.7rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                          lg: "1rem",
                        }}
                        onClick={() => {
                          commentReview({
                            commentId,
                            review: "dislike",
                            reviewerId: `${Session?._id}`,
                            reviewedId: userId,
                          });
                        }}
                        position={"relative"}
                      >
                        Poco Útil
                        {reactionStatus === "dislike" && (
                          <CheckIcon position={"absolute"} right={5} />
                        )}
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        fontSize={{
                          base: "0.7rem",
                          sm: "0.8rem",
                          md: "0.9rem",
                          lg: "1rem",
                        }}
                        onClick={() => {
                          if (
                            status === "loading" ||
                            status === "unauthenticated"
                          ) {
                            return document
                              .getElementById("signInButton")
                              ?.click();
                          }
                          commentReview({
                            commentId,
                            review: "spam",
                            reviewerId: `${Session?._id}`,
                            reviewedId: userId,
                          });
                        }}
                        position={"relative"}
                      >
                        Es Spam
                        {reactionStatus === "spam" && (
                          <CheckIcon position={"absolute"} right={5} />
                        )}
                      </MenuItem>

                      {status === "authenticated" &&
                        `${Session?._id}` === userId &&
                        !alreadyResponded && (
                          <>
                            <MenuDivider d={{ base: "block", sm: "none" }} />
                            <MenuItem
                              d={{ base: "inline", sm: "none" }}
                              fontSize={{
                                base: "0.7rem",
                                sm: "0.8rem",
                                md: "0.9rem",
                                lg: "1rem",
                              }}
                              onClick={onOpenReviewedResponse}
                            >
                              Responder
                            </MenuItem>
                          </>
                        )}
                    </MenuList>
                  </h1>
                </Menu>

                {status === "authenticated" &&
                  `${Session?._id}` === userId &&
                  !alreadyResponded && (
                    <Button
                      variant={"ghost"}
                      fontWeight={"normal"}
                      d={{ base: "none", sm: "inline" }}
                      fontSize={{ base: "sm", md: "lg" }}
                      _hover={{
                        color: "gray",
                      }}
                      onClick={onOpenReviewedResponse}
                    >
                      Responder
                    </Button>
                  )}
                <ReviewedResponse
                  isOpen={isOpenReviewedResponse}
                  onClose={onCloseReviewedResponse}
                  userWhoCommented={userComment?.name}
                  {...{ commentId, setAlreadyResponded, setReviewedResponse }}
                />
              </ButtonGroup>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      {alreadyResponded && reviewedResponse && (
        <Response
          reviewedResponse={reviewedResponse}
          {...{
            professionalName,
            professionalPic,
            Session,
            userId,
            editReviewedResponse,
            loading,
            commentId,
          }}
        />
      )}
    </>
  );
}
type ResponseProps = {
  loading: boolean;
  reviewedResponse: {
    response: string;
    date: string;
    edited: boolean;
  };
  commentId: string;
  professionalName: string;
  professionalPic: string;
  userId: string;
  Session: Session;
  editReviewedResponse({
    commentId,
    response,
    reviewedId,
    edited,
  }: {
    commentId: string;
    response: string;
    reviewedId: string;
    edited: boolean;
  }): void;
};

const Response = ({
  loading,
  reviewedResponse,
  commentId,
  professionalName,
  professionalPic,
  userId,
  Session,
  editReviewedResponse,
}: ResponseProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedResponse, setEditedResponse] = useState<string>(
    reviewedResponse.response
  );
  return (
    <Stack
      bg="#d6d6d6"
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: "#d6d6d6",
        pos: "absolute",
        top: "-15px",
        left: "50%",
        transform: "translateX(-50%) rotate(180deg)",
      }}
    >
      <Flex
        minH={"2rem"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box d={"flex"} alignItems={"center"}>
          <Avatar
            src={professionalPic}
            height={{ base: "30px", sm: "50px" }}
            width={{ base: "30px", sm: "50px" }}
            alignSelf={"center"}
          />
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            alignItems={{ base: "center", sm: "" }}
          >
            <Text
              ml={2}
              color={"black"}
              textTransform={"capitalize"}
              fontWeight={"bold"}
              fontSize={{ base: ".65rem", xl: "md" }}
            >
              {professionalName}
            </Text>
            <Text
              ml={2}
              color={"medium_green"}
              textAlign={"start"}
              fontWeight={"bold"}
              fontSize={{ base: ".65rem", xl: "md" }}
            >
              {reviewedResponse.date}
            </Text>
            {reviewedResponse.edited && (
              <Text fontSize={".6rem"} color={"gray"} ml={2}>
                (editado)
              </Text>
            )}
          </Flex>
        </Box>
        {userId === `${Session?._id}` && !isEditing && (
          <Button
            variant={"ghost"}
            rightIcon={<EditIcon />}
            fontSize={{
              base: "0.7rem",
              sm: "0.8rem",
              md: "0.9rem",
              lg: "1rem",
            }}
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
            color={"black"}
          >
            Editar
          </Button>
        )}
      </Flex>
      <Box>
        {!isEditing ? (
          <Text
            mt={2}
            textAlign={"start"}
            color={"black"}
            fontSize={{
              base: "0.7rem",
              sm: "0.9rem",
              md: "0.9rem",
              lg: "1rem",
            }}
            css={{
              ":first-letter": {
                textTransform: "uppercase",
              },
            }}
            transition={".5s"}
          >
            {reviewedResponse.response}
          </Text>
        ) : (
          <Box position={"relative"}>
            <Textarea
              resize={"none"}
              outline={"none"}
              border={"none"}
              borderRadius={"none"}
              color={"black"}
              maxLength={100}
              fontSize={{
                base: "0.7rem",
                sm: "0.9rem",
                md: "0.9rem",
                lg: "1rem",
              }}
              p={0}
              mt={2}
              pr={16}
              borderBottom={isEditing ? "2px solid #b4b4b4" : ""}
              transition={".5s"}
              _focus={{
                outline: "none",
                borderBottom: "2px solid white",
              }}
              _hover={{ border: "" }}
              ref={inputRef}
              value={editedResponse}
              onChange={(e) => setEditedResponse(e.currentTarget.value)}
            />
            <Text
              fontSize={{ base: "sm", md: "md" }}
              position={"absolute"}
              top={2}
              right={0}
              color={"black"}
            >
              {editedResponse.length} / 100
            </Text>
          </Box>
        )}
        {isEditing && (
          <Flex w={"100%"} justifyContent={"flex-end"} mt={2}>
            <Button
              mr={2}
              variant={"ghost"}
              fontSize={{
                base: "0.7rem",
                sm: "0.8rem",
                md: "0.9rem",
                lg: "1rem",
              }}
              _focus={{
                border: "none",
                transition: ".5s",
                bg: "gray",
              }}
              onClick={() => {
                setIsEditing(false);
                setEditedResponse(reviewedResponse.response);
              }}
            >
              Cancelar
            </Button>
            <Button
              fontSize={{
                base: "0.7rem",
                sm: "0.8rem",
                md: "0.9rem",
                lg: "1rem",
              }}
              isDisabled={
                editedResponse === reviewedResponse.response ? true : false
              }
              isLoading={loading}
              bg={
                editedResponse === reviewedResponse.response
                  ? "gray"
                  : "#3EA6FF"
              }
              _hover={{
                bg:
                  editedResponse === reviewedResponse.response
                    ? "gray"
                    : "#3c93e0",
              }}
              onClick={() => {
                editReviewedResponse({
                  commentId,
                  response: editedResponse,
                  reviewedId: `${Session?._id}`,
                  edited: true,
                });
                if (!loading) setIsEditing(false);
              }}
            >
              Guardar
            </Button>
          </Flex>
        )}
      </Box>
    </Stack>
  );
};

export default function Comments({ user, Session }: any) {
  interface IComment {
    userComment: string;
    description: string;
    score: number;
    date: string;
    _id: string;
    reactions: {
      likes: {
        amount: number;
        users: string[];
      };
      dislikes: {
        amount: number;
        users: string[];
      };
      spam: {
        amount: number;
        users: string[];
      };
      reviewedResponse: {
        response: string;
        date: string;
        edited: boolean;
      };
    };
  }

  return (
    <Flex textAlign={"center"} justifyContent={"center"}>
      <SimpleGrid columns={[1, null, 1]} spacing={"6"} mt={5} mb={10} w={"95%"}>
        {user?.rating.comments
          .filter((f: IComment) => f.description && f)
          .sort((prev: IComment, curr: IComment) =>
            prev.reactions.likes.amount > curr.reactions.likes.amount ? -1 : 1
          )
          .map((el: any, index: number) => (
            <TestimonialCard
              professionalName={user.name}
              professionalPic={user.profilePic}
              commentId={el._id}
              userId={user._id}
              description={el.description}
              score={Math.floor(el.score)}
              date={el.date}
              userComment={el.userComment}
              index={index}
              reactions={el.reactions}
              key={index}
              Session={Session}
            />
          ))}
      </SimpleGrid>
    </Flex>
  );
}
